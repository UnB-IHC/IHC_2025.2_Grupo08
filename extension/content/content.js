    // Escuta mensagens vindas do popup.js
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.type === "RUN_AXE") {
        if (!window.axe) {
          sendResponse({ success: false, error: "axe-core não carregado" });
          return;
        }

        window.axe.configure(axeConfig);

        window.axe.run(document, {}, (err, results) => {
          if (err) sendResponse({ success: false, error: err.message });
          else sendResponse({ success: true, results });

          results.violations.forEach((v) => {
            v.nodes.forEach((n) => {
                n.target.forEach((t) => {
                    const element = document.querySelector(t);

                    const infoDiv = document.createElement("div");
                    infoDiv.style.width = "auto";
                    infoDiv.style.display = "flex";
                    infoDiv.style.backgroundColor = "white";
                    infoDiv.style.paddingTop = "5px";
                    infoDiv.style.paddingBottom = "5px";


                    const info = document.createElement("img");
                    info.src = chrome.runtime.getURL("images/alert.png");
                    info.alt = "Violação de acessibilidade detectada";
                    info.style.width = "20px";
                    info.style.height = "20px";
                    info.style.marginLeft = "5px";
                    info.style.verticalAlign = "middle";
                    info.style.zIndex = "99999";
                    info.style.position = "relative";
                    info.style.borderRadius = "45%";

                    const hoverText = document.createElement("div");
                    hoverText.style.color = "black";
                    hoverText.innerText = n.failureSummary;
                    // hoverText.addEventListener("mouseover", () => {
                    //     hoverText.style.display = "none";
                    //     hoverText.style.visibility = "hidden";
                    // })
                    // hoverText.addEventListener("mouseleave", () => {
                    //     hoverText.style.display = "none";
                    //     hoverText.style.visibility = "hidden";
                    // })

                    infoDiv.appendChild(info);
                    infoDiv.appendChild(hoverText);

                    element.append(infoDiv);
                })
            })
        })
        });

        return true; // mantém o canal aberto para resposta assíncrona
      }
    });
