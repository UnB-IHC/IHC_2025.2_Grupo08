// Escuta mensagens vindas do popup.js
console.log("[content.js] ========== INICIANDO CONTENT SCRIPT ==========");
console.log("[content.js] Script carregado e pronto para receber mensagens");
console.log("[content.js] Verificando dependências...");

// Verifica se as dependências foram carregadas
console.log("[content.js] window.axe disponível?", typeof window.axe !== 'undefined');
console.log("[content.js] axeConfig disponível?", typeof axeConfig !== 'undefined');
console.log("[content.js] translateViolation disponível?", typeof translateViolation !== 'undefined');
console.log("[content.js] ptBRrules disponível?", typeof ptBRrules !== 'undefined');
const categoryRuleMap = {
  "Teclado": ["keyboard", "scrollable-region-focusable", "tabindex", "keyboard-access"],
  "Foco": ["focus-visible", "focus-order", "focus-trap", "focusable"],
  "Cabeçalhos": ["heading-order", "page-has-heading-one", "structure"],
  "Links": ["link-name", "link-purpose", "link-text"],
  "Imagens": ["image-alt", "alt-text", "image-redundant-alt"],
  "Formulários": ["label", "form-field-multiple-labels", "input-button-name", "button-name"],
  "Estrutura Semântica": ["html5-scope", "landmark-main-is-top-level", "landmark-unique", "html-lang"],
  "Títulos e Rótulos": ["button-name", "document-title", "frame-title", "heading-order"],
  "Contraste": ["color-contrast"],
  "Multimídia": ["audio-caption", "video-caption", "audio-description", "video-description"],
  "Navegação": ["landmark-main-is-top-level", "landmark-unique", "skip-link"],
  "Responsividade": ["meta-viewport", "mobile-viewport"],
  "ARIA": ["aria-required-attr", "aria-roles", "aria-allowed-attr", "aria-valid-attr"],
  "Animações": ["prefers-reduced-motion"]
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("[content.js] ===== MENSAGEM RECEBIDA =====");
  console.log("[content.js] Tipo de mensagem:", msg.type);
  console.log("[content.js] Filtro:", msg.filter);
  
  if (msg.type === "RUN_AXE") {
    console.log("[content.js] Iniciando verificação com axe...");
    console.log("[content.js] Filtro selecionado:", msg.filter);
    
    if (!window.axe) {
      console.error("[content.js] ERRO: axe-core não está carregado");
      sendResponse({ success: false, error: "axe-core não carregado" });
      return;
    }

    window.axe.configure(axeConfig);

    window.axe.run(document, {}, (err, results) => {
      console.log("[content.js] axe.run completado");
      
      if (err) {
        console.error("[content.js] Erro no axe.run:", err);
        sendResponse({ success: false, error: err.message });
        return;
      }

      try {
        console.log("[content.js] Iniciando processamento de violations...");
        
        // Filtra violations com base na categoria selecionada
        let filteredViolations = results.violations;
        
        if (msg.filter && msg.filter !== 'all') {
          console.log("[content.js] Aplicando filtro:", msg.filter);
          const selectedRules = categoryRuleMap[msg.filter] || [];
          
          filteredViolations = results.violations.filter(v => {
            // Verifica se a regra está na categoria selecionada
            const ruleMatches = selectedRules.some(rule => 
              v.id.includes(rule) || rule.includes(v.id)
            );
            
            // Se não encontrar por rule, tenta match mais genérico
            if (!ruleMatches) {
              const categoryLower = msg.filter.toLowerCase();
              const ruleIdLower = v.id.toLowerCase();
              return ruleIdLower.includes(categoryLower) || 
                     categoryRuleMap[msg.filter]?.some(rule => ruleIdLower.includes(rule.toLowerCase()));
            }
            
            return ruleMatches;
          });
          
          console.log("[content.js] Violations após filtro:", filteredViolations.length);
        }
        
        // Processa as violations filtradas
        filteredViolations.forEach((v) => {
          try {
            if (typeof translateViolation === 'function') {
              translateViolation(v);
            }
          } catch (transErr) {
            console.warn("[content.js] Erro ao traduzir violation:", transErr);
          }

          v.nodes.forEach((n) => {
            n.target.forEach((t) => {
              try {
                const element = document.querySelector(t);
                if (!element) return;

                // Adiciona borda vermelha no elemento
                element.classList.add("a11y-highlight");
                element.style.outline = "3px solid #e33";
                element.style.position = element.style.position || "relative";

                // Cria o ícone de alerta flutuante
                const icon = document.createElement("img");
                icon.src = chrome.runtime.getURL("images/alert.png");
                icon.alt = "Problema de acessibilidade detectado";
                icon.className = "a11y-marker";
                icon.style.width = "24px";
                icon.style.height = "24px";
                icon.style.position = "absolute";
                icon.style.top = "-12px";
                icon.style.right = "-12px";
                icon.style.zIndex = "999999";
                icon.style.cursor = "pointer";
                icon.title = n.failureSummary;

                // Tooltip customizado (ao passar o mouse)
                icon.addEventListener("mouseenter", (event) => {
                  const tooltip = document.createElement("div");
                  tooltip.className = "marker-tooltip";
                  tooltip.textContent = n.failureSummary;
                  tooltip.style.position = "fixed";
                  tooltip.style.background = "#fff";
                  tooltip.style.border = "1px solid #e33";
                  tooltip.style.padding = "6px 8px";
                  tooltip.style.borderRadius = "6px";
                  tooltip.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
                  tooltip.style.top = (event.clientY + 10) + "px";
                  tooltip.style.left = (event.clientX + 10) + "px";
                  tooltip.style.zIndex = "999999";
                  tooltip.style.maxWidth = "250px";
                  tooltip.style.fontSize = "13px";
                  tooltip.style.color = "#000";
                  document.body.appendChild(tooltip);

                  icon.addEventListener("mouseleave", () => {
                    tooltip.remove();
                  }, { once: true });
                });

                element.appendChild(icon);
              } catch (elemErr) {
                console.warn("[content.js] Erro ao processar elemento:", elemErr);
              }
            });
          });
        });
        
        console.log("[content.js] Enviando resposta de sucesso com", filteredViolations.length, "violations");
        
        // Retorna tanto violations filtradas quanto o total
        const responseResults = {
          ...results,
          violations: filteredViolations,
          totalViolations: results.violations.length
        };
        
        sendResponse({ success: true, results: responseResults });
      } catch (processErr) {
        console.error("[content.js] Erro ao processar violations:", processErr);
        sendResponse({ success: false, error: processErr.message });
      }
    });

    return true; // mantém o canal aberto para resposta assíncrona
  }
});

console.log("[content.js] Listener registrado com sucesso");
console.log("[content.js] ========== CONTENT SCRIPT PRONTO ==========");
