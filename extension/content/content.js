    // Escuta mensagens vindas do popup.js
console.log("[content.js] Script carregado e pronto para receber mensagens");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("[content.js] Mensagem recebida:", msg);
  
  if (msg.type === "RUN_AXE") {
    console.log("[content.js] Iniciando verificação com axe...");
    
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
        results.violations.forEach((v) => {
          translateViolation(v);
          v.nodes.forEach((n) => {
            n.target.forEach((t) => {
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
            });
          });
        });
        console.log("[content.js] Enviando resposta de sucesso com", results.violations.length, "violations");
        sendResponse({ success: true, results });
      } catch (processErr) {
        console.error("[content.js] Erro ao processar violations:", processErr);
        sendResponse({ success: false, error: processErr.message });
      }
    });

    return true; // mantém o canal aberto para resposta assíncrona
  }
});
