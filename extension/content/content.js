    // Escuta mensagens vindas do popup.js
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.type === "RUN_AXE") {
        if (!window.axe) {
          sendResponse({ success: false, error: "axe-core não carregado" });
          return;
        }

        window.axe.configure(axeConfig);

        window.axe.run(document, {}, (err, results) => {
          if (err){
            sendResponse({ success: false, error: err.message });
          } 
          else {
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
                  icon.addEventListener("mouseenter", () => {
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
            sendResponse({ success: true, results });
        }});

        return true; // mantém o canal aberto para resposta assíncrona
      }
    });
