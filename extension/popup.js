function applyFilter(selectedCategory) {
  console.log("Filtrando por:", selectedCategory);
  
  const allItems = document.querySelectorAll('.item'); 

  allItems.forEach(item => {
      const catAttr = item.getAttribute('data-categories');
      const itemCategories = catAttr ? catAttr.split(',') : ['Outros'];

      if (selectedCategory === 'all' || itemCategories.includes(selectedCategory)) {
          item.style.display = ''; 
      } else {
          item.style.display = 'none'; 
      }
  });
}

document.getElementById("runBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const status = document.getElementById("status");
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  status.textContent = "Verificando...";

  // Verifica se tab existe
  if (!tab) {
    status.textContent = "Erro: Nenhuma aba ativa encontrada.";
    console.error('[popup.js] Nenhuma aba ativa encontrada');
    return;
  }

  try {
    chrome.tabs.sendMessage(tab.id, { type: "RUN_AXE" }, (response) => {
      // Verifica erro de comunicação
      if (chrome.runtime.lastError) {
        console.error("[popup.js] Erro de comunicação:", chrome.runtime.lastError);
        status.textContent = "Erro: " + chrome.runtime.lastError.message;
        return;
      }

      if (!response) {
        status.textContent = "Erro: Sem resposta do content script.";
        console.warn('[popup.js] Resposta vazia do content script');
        return;
      }

      if (!response.success) {
        status.textContent = "Erro: " + response.error;
        console.error('[popup.js] Erro na resposta:', response.error);
        return;
      }

      const results = response.results;
      if (!results || !results.violations) {
        status.textContent = "Erro: Resposta inválida.";
        console.error('[popup.js] Resposta sem violations:', response);
        return;
      }

      if (!results.violations.length) {
        status.textContent = "Nenhum problema encontrado 🎉";
        return;
      }

      status.textContent = `${results.violations.length} problemas encontrados:`;
      results.violations.forEach((v) => {
        const div = document.createElement("div");
        div.className = "violation";
        div.innerHTML = `<strong>${v.id}</strong>: ${v.help}
        <br><a href="${v.helpUrl}" target="_blank">Saiba mais</a>`;
        resultsDiv.appendChild(div);
      });
    });
  } catch (err) {
    status.textContent = "Erro ao enviar mensagem: " + err.message;
    console.error('[popup.js] Exceção ao enviar mensagem:', err);
  }
});

document.getElementById("clearBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // remove ícones e tooltips
      document.querySelectorAll(".a11y-marker, .marker-tooltip").forEach(el => el.remove());
      // remove bordas
      document.querySelectorAll(".a11y-highlight, .a11y-marker, .marker-tooltip")
      .forEach(el => {
        el.classList.remove("a11y-highlight");
        el.style.outline = "";
      });
    }
  });
});

$(function(){
    // Carrega o checklist ao clicar nos botões
    document.getElementById("projeto").addEventListener("click", () => {
       $("#checklist").load("partials/projectChecklist.html", () => {
           // Reaplica o filtro atual assim que o novo conteúdo carregar
           const currentFilter = document.getElementById('categoryFilter').value;
           applyFilter(currentFilter);
       }); 
    });

    document.getElementById("guia").addEventListener("click", () => {
       $("#checklist").load("partials/projectChecklist.html", () => { // Suponho que tenha um guiaChecklist.html ou similar
           const currentFilter = document.getElementById('categoryFilter').value;
           applyFilter(currentFilter);
       }); 
    });

    // Listener do Filtro (Usa delegação de evento para funcionar sempre)
    $(document).on('change', '#categoryFilter', function() {
        applyFilter(this.value);
    });
});
