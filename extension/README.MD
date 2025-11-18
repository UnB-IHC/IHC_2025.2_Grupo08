# Verificador de Acessibilidade (WCAG 2.2)

Esta extensão de navegador, desenvolvida pelo grupo 8 da disciplina Interação Humano-Computador, semestre 2025/2, tem o principal objetivo de auxiliar programadores, designers e especialistas em QA a diagnosticar barreiras de acessibilidade em páginas web. A ferramenta combina uma verificação automatizada baseada em regras (utilizando a engine axe-core) com checklists manuais baseadas nas diretrizes WCAG 2.2.

## 🛠 Técnicas de Scripting e Análise de DOM

A extensão utiliza a API de *Content Scripts* do Manifesto V3 para injetar código diretamente no contexto da página visitada. Abaixo descrevem-se as principais técnicas utilizadas para o diagnóstico e renderização dos resultados:

### 1. Análise Automatizada (Engine Axe-core)
O núcleo do diagnóstico reside no ficheiro content.js. A extensão injeta a biblioteca axe.min.js na página alvo.
* *Execução:* Através da função window.axe.run(), o script percorre a árvore DOM (Document Object Model) da página ativa.
* *Escopo:* A análise verifica elementos HTML, atributos ARIA, contrastes de cor e estrutura semântica contra regras pré-definidas (configuradas em axe.config.js e traduzidas pelo ficheiro pt_BR.js).

### 2. Mapeamento e Filtragem de Categorias
Após a varredura bruta, o script aplica uma lógica de pós-processamento:
* *Agrupamento:* Um objeto categoryRuleMap (definido em content.js) mapeia regras técnicas (ex: image-alt, label) para categorias amigáveis ao utilizador (ex: "Imagens", "Formulários").
* *Filtragem Dinâmica:* O popup.js envia o filtro selecionado pelo utilizador. O content.js itera sobre as violações retornadas pelo Axe e devolve apenas aquelas que correspondem à categoria selecionada na interface da extensão.

### 3. Manipulação do DOM para Feedback Visual
Para indicar a localização dos erros, o script manipula o DOM da página em tempo real:
* *Highlighter (Bordas):* O script identifica o nó HTML responsável pela violação (violation.nodes[0].target) e aplica estilos CSS diretamente (element.style.outline, element.classList.add("a11y-highlight")) para criar uma borda vermelha visível.
* *Injeção de Tooltips:*
    * O script cria dinamicamente elementos <div> e ícones (<i>) usando document.createElement.
    * *Posicionamento:* Utiliza eventos do rato (mouseover/mouseleave) para calcular coordenadas (event.clientX/Y) e posicionar uma caixa flutuante (tooltip) próxima ao elemento com erro, contendo a descrição do problema e sugestão de correção.

### 4. Mensageria Assíncrona (Runtime Messaging)
A comunicação entre a interface da extensão (popup.js) e o script da página (content.js) ocorre via chrome.runtime.sendMessage e chrome.runtime.onMessage. Isto permite que o clique no botão "Rodar verificação" na janela da extensão dispare a função complexa de análise dentro da aba do navegador.

---

## 🚀 Como Instalar e Executar

Como esta extensão ainda não se encontra na Chrome Web Store, deve ser carregada em *modo de programador* (Developer Mode).

### Pré-requisitos
* Navegador baseado em Chromium (Google Chrome, Microsoft Edge, Brave, etc.).
* Todos os ficheiros do projeto descarregados numa única pasta local.
* *Nota Importante:* Certifique-se de que a pasta content/ contém os ficheiros axe.min.js, axe.config.js e translator.js, conforme referenciado no manifest.json.

### Passo a Passo

1.  *Aceda ao Gestor de Extensões:*
    * No Chrome, digite na barra de endereços: chrome://extensions
    * No Edge, digite: edge://extensions

2.  *Ative o Modo de Programador:*
    * No canto superior direito da página de extensões, ative o interruptor *"Modo de programador"* (ou Developer mode).

3.  *Carregue a Extensão:*
    * Clique no botão *"Carregar não compactada"* (ou Load unpacked) que surgiu no canto superior esquerdo.
    * Na janela de seleção de ficheiros, navegue até à pasta onde guardou o projeto e selecione a *pasta raiz* (selecione a pasta, não um ficheiro específico).

4.  *Fixar a Extensão (Opcional):*
    * Clique no ícone de "puzzle" na barra de ferramentas do navegador.
    * Encontre o "Verificador de acessibilidade" e clique no ícone de "alfinete" para mantê-lo sempre visível.

### Como Utilizar

1.  Navegue até ao sítio web que deseja analisar.
2.  Clique no ícone da extensão na barra de ferramentas.
3.  (Opcional) Selecione uma categoria no filtro (ex: "Imagens" ou "Todos").
4.  Clique em *"Rodar verificação"*.
    * Os erros serão listados no popup e destacados com bordas vermelhas na página.
5.  Passe o rato sobre os ícones de alerta ⚠️ criados na página para ver detalhes técnicos do erro.
6.  Para remover as marcações visuais, clique em *"Limpar marcações"*.

---

## 📁 Estrutura de Ficheiros Principal

* manifest.json: Configuração da extensão e permissões.
* content.js: Script principal executado na página (Lógica de análise e manipulação de DOM).
* popup.html / popup.js: Interface de utilizador (janela da extensão).
* projectChecklist.html: Checklist manual de IHC/Acessibilidade.
* pt_BR.js: Ficheiro de tradução das regras de acessibilidade.
* populateChecklist.js: Lógica para gerar os itens da checklist manual.