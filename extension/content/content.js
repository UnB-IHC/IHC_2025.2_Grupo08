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
  "Teclado": [
    "tabindex",                  // ordem de foco não quebrada
    "scrollable-region-focusable"// regiões roláveis acessíveis via teclado
  ],
  "Foco": [
    "focus-order-semantics"      // função apropriada na ordem de foco
    // (focus-trap/focusable não existem como rule ID no axe-core)
  ],
  "Cabeçalhos": [
    "page-has-heading-one",
    "heading-order",
    "empty-heading"
  ],
  "Links": [
    "link-name",
    "identical-links-same-purpose",
    "link-in-text-block"
  ],
  "Imagens": [
    "image-alt",
    "input-image-alt",
    "role-img-alt",
    "svg-img-alt",
    "image-redundant-alt",
    "object-alt",
    "area-alt"
  ],
  "Formulários": [
    "label",
    "label-title-only",
    "label-content-name-mismatch",
    "form-field-multiple-labels",
    "input-button-name",
    "select-name",
    "autocomplete-valid"
  ],
  "Estrutura Semântica": [
    "list",
    "listitem",
    "definition-list",
    "dlitem",
    "region",
    "landmark-one-main",
    "landmark-unique",
    "landmark-no-duplicate-main",
    "landmark-no-duplicate-banner",
    "landmark-no-duplicate-contentinfo",
    "landmark-main-is-top-level",
    "landmark-banner-is-top-level",
    "landmark-contentinfo-is-top-level",
    "landmark-complementary-is-top-level",
    "scope-attr-valid",
    "table-fake-caption",
    "table-duplicate-name",
    "td-has-header",
    "td-headers-attr",
    "th-has-data-cells"
  ],
  "Títulos e Rótulos": [
    "document-title",
    "frame-title",
    "frame-title-unique",
    "button-name",
    "input-button-name"
  ],
  "Contraste": [
    "color-contrast",
    "color-contrast-enhanced",
    "link-in-text-block"
  ],
  "Multimídia": [
    "audio-caption",
    "video-caption",
    "no-autoplay-audio"
  ],
  "Navegação": [
    "bypass",                    // pelo menos um mecanismo de ignorar blocos
    "skip-link",                 // destino de link de escape válido
    "region",
    "landmark-one-main"
  ],
  "Responsividade": [
    "meta-viewport",
    "meta-viewport-large",
    "css-orientation-lock"
  ],
  "ARIA": [
    "aria-allowed-attr",
    "aria-allowed-role",
    "aria-required-attr",
    "aria-required-children",
    "aria-required-parent",
    "aria-roles",
    "aria-valid-attr",
    "aria-valid-attr-value",
    "aria-roledescription",
    "aria-text",
    "aria-command-name",
    "aria-input-field-name",
    "aria-dialog-name",
    "aria-meter-name",
    "aria-progressbar-name",
    "aria-toggle-field-name",
    "aria-tooltip-name",
    "aria-treeitem-name"
  ],
  "Idioma": [
    "html-has-lang",
    "html-lang-valid",
    "valid-lang",
    "html-xml-lang-mismatch"
  ],
  "Espaçamento de Texto": [
    "avoid-inline-spacing"
  ]
};


const RuleCriteriaMapping = {
  "tabindex": ['d-1.4'],
  "focus-order-semantics": ['d-1.4'],
  "region": ['d-4.1'],
  "landmark": ['d-4.1'],
  "page-has-main": ['d-4.1'],
  "header-present": ['d-4.1'],
  "list": ['d-5.1'],
  "listitem": ['d-5.1'],
  "link-name": ['c-7.2'],
  "identical-links-same-purpose": ['c-7.5'],
  "bypass": ['ds-7.6'],
  "skip-link": ['ds-7.6'],
  "label": ['d-9.1'],
  "label-title-only": ['d-9.1'],
  "label-content-name-mismatch": ['d-9.1'],
  "button-name": ['d-8.1'],
  "input-button-name": ['d-8.1'],
  "th-has-data-cells": ['d-6.3'],
  "td-has-header": ['d-6.3'],
  "scope-attr-valid": ['d-6.3'],
  "empty-table-header": ['d-6.3'],
  "image-alt": ['c-2.1'],
  "input-image-alt": ['c-2.1'],
  "role-img-alt": ['c-2.1'],
  "svg-img-alt": ['c-2.1'],
  "image-redundant-alt": ['c-2.1'],
  "html-has-lang": ['d-13.2'],
  "html-lang-valid": ['d-13.2'],
  "valid-lang": ['d-13.2'],
  "html-xml-lang-mismatch": ['d-13.2'],
  "page-has-heading-one": ['c-3.1'],
  "heading-order": ['c-3.3'],
  "empty-heading": ['c-3.1'],
  "avoid-inline-spacing": ['ds-12.2', 'ds-12.3', 'ds-12.4', 'ds-12.5'],
  "color-contrast": ['ds-11.2', 'ds-11.3'],
  "color-contrast-enhanced": ['ds-11.2', 'ds-11.3'],
  "link-in-text-block": ['ds-11.2', 'ds-11.3'],
  // Não possui rule específica para 44x44px, mantido de acordo:
  // "no-rule-44px": [],
  "meta-viewport": ['d-13.3'],
  "meta-viewport-large": ['d-13.3'],
  // Não possui rule específica para acionamento apenas por foco de cursor:
  // "no-rule-focus-activation": []
}

const highlightChecklist = new Set([]);

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
                  icon.style.zIndex = "999998";
                  icon.style.cursor = "pointer";
                  icon.style.pointerEvents = "auto";
                  icon.title = v.help;
                  

                // Tooltip customizado (ao passar o mouse)
                icon.addEventListener("mouseenter", (eventevent) => {
                  const tooltip = document.createElement("div");
                  tooltip.className = "marker-tooltip";
                  tooltip.textContent = v.help
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

                    let top = event.clientY + 15;
                    let left = event.clientX + 15;
                                  
                    // Se vai sair à direita, coloca à esquerda do mouse
                    if (left + 250 > window.innerWidth) {
                        left = event.clientX - 250 - 15;
                    }
                  
                    // Se vai sair embaixo, coloca acima do mouse
                    if (top + 100 > window.innerHeight) {
                        top = event.clientY - 100 - 15;
                    }
                  
                    tooltip.style.top = Math.max(10, top) + "px";
                    tooltip.style.left = Math.max(10, left) + "px";

                  icon.addEventListener("mouseleave", () => {
                    tooltip.remove();
                  }, { once: true });
                });

                element.appendChild(icon);
              } catch (elemErr) {
                console.warn("[content.js] Erro ao processar elemento:", elemErr);
              }
            });
            RuleCriteriaMapping[v.id] ? RuleCriteriaMapping[v.id].forEach((criteria) => {highlightChecklist.add(criteria)}) : null;
          });
        });
        
        console.log("[content.js] Enviando resposta de sucesso com", filteredViolations.length, "violations");
        
        // Retorna tanto violations filtradas quanto o total
        const responseResults = {
          ...results,
          violations: filteredViolations,
          totalViolations: results.violations.length,
          highlightChecklist: Array.from(highlightChecklist),
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
