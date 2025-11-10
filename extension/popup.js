document.getElementById("runBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  document.getElementById("status").textContent = "Verificando...";

  chrome.tabs.sendMessage(tab.id, { type: "RUN_AXE" }, (response) => {
    const status = document.getElementById("status");
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!response) { status.textContent = "Sem resposta."; return; }
    if (!response.success) { status.textContent = "Erro: " + response.error; return; }

    console.log(response);


    const results = response.results;
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
});