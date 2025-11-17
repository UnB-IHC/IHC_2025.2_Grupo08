# Checklist de Conteúdo

### Estrutura e Clareza

- [ ] **Usar linguagem simples, clara e direta**, evitando jargões ou frases longas.   `WCAG 3.1.5 (AAA)` [(68)](https://www.w3.org/WAI/WCAG22/Understanding/reading-level)
- [ ] **Organizar o conteúdo com títulos, subtítulos e parágrafos curtos**, para facilitar a navegação e a leitura.   `WCAG 2.4.6 (AA)` [(69)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)
- [ ] **Garantir que os títulos descrevam corretamente o conteúdo da seção** que estão introduzindo.   `WCAG 2.4.6 (AA)` [(70)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)
- [ ] **Usar tags de cabeçalho (`<h1>` a `<h6>`)** para marcar textos que parecem ser títulos e subtítulos.   `5.3.1/1.3.1 (A)` [(71)](#)
- [ ] **Garantir o uso Semântico de Títulos**, utilizando os cabeçalhos para identificar seções do conteúdo, e não apenas para formatação visual.   `5.3.2/2.4.6 (AA)` [(72)](#)
- [ ] **Manter Ordem Lógica de Títulos**, seguindo a hierarquia correta (h1, h2, h3...), sem pular níveis.   `5.3.5/2.4.6 (AA)` [(73)](#)
- [ ] **Evitar abreviações, siglas desconhecidas ou termos muito técnicos**, ou fornecer suas explicações.   `WCAG 3.1.3 (AAA)` [(74)](https://www.w3.org/WAI/WCAG22/Understanding/unusual-words)
- [ ] **Manter consistência terminológica** ao longo do site, usando nomes idênticos para botões, seções e funções.   `(Boa prática)` [(75)](#)
- [ ] **Escrever conteúdos que possam ser compreendidos fora de ordem**, facilitando a leitura por leitores de tela.   `(Apoiando WCAG 1.3.2)` [(76)](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)

### Alternativas para Mídia

- [ ] **Incluir textos alternativos (`alt`) adequados para todas as imagens informativas**, explicando sua função e contexto.   `WCAG 1.1.1 (A)` [(77)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [ ] **Usar `alt=""` (texto alternativo vazio)** em imagens puramente decorativas que não transmitem informação.   `WCAG 1.1.1 (A)` [(78)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [ ] **Descrever no texto ou usar alternativa textual para imagens que contêm texto**, garantindo acesso a todas as informações.   `WCAG 1.4.5 (AA)` [(79)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text)
- [ ] **Evitar texto dentro de imagens**, exceto quando o texto é essencial e não é possível reproduzi-lo como texto real (Ex: logotipos, gráficos).   `WCAG 1.4.5 (AA)` [(80)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text)
- [ ] **Criar uma alternativa em texto para todo conteúdo visual ou auditivo** que não seja puramente textual.   `5.14.1, 5.14.2/1.2.1 (A), 1.2.2 (A), 1.2.3 (A) ITRAC` [(81)](#)
- [ ] **Fornecer alternativas para conteúdo que depende de um só sentido** (áudio ou vídeo), como transcrição para áudio ou descrição textual para vídeo.   `1.2.3 (A) ITRAC` [(82)](#)
- [ ] **Fornecer transcrições para áudios** e legendas sincronizadas para vídeos.   `WCAG 1.2.2 (A)` e `1.2.4 (AA)` [(83)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded)
- [ ] **Evitar uso de metáforas visuais complexas** que possam gerar confusão.   _(Guia-UK)_ [(84)](#)

### Links e Botões

- [ ] **Escrever links com textos significativos**, evitando termos genéricos como “clique aqui” ou “saiba mais”.   `WCAG 2.4.4 (A)` [(85)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)
- [ ] **Garantir Propósito do Link Claro**, onde o texto do link descreve claramente o seu destino (sendo simples e, se curto, explicado pelo contexto).   `5.7.4/2.4.4 (A) ITRAC` [(86)](#)
- [ ] **Garantir Links Compreensíveis** mesmo quando lidos isoladamente por um leitor de telas.   `5.7.3/2.4.4 (A) ITRAC` [(87)](#)
- [ ] **Garantir Nomes de Links Únicos** para todos os links que levam a lugares diferentes.   `5.7.5/3.2.4 (AA)` [(88)](#)
- [ ] **Garantir Propósito do Botão Claro**, usando palavras simples e, se necessário, uma explicação para descrever o que ele faz.   `5.8.3/2.4.6 (AA) ITRAC` [(89)](#)
- [ ] **Garantir que ícones tenham rótulos acessíveis**, visíveis ou via `aria-label`.   `WCAG 4.1.2 (A)` [(90)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

### Idioma, Listas e Metadados

- [ ] **Identificar corretamente a linguagem do documento** usando `lang="pt-BR"` na tag HTML.   `WCAG 3.1.1 (A)` [(91)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page)
- [ ] **Sinalizar mudança de idioma dentro do texto** usando o atributo `lang` (ex.: `<span lang="en">`).   `WCAG 3.1.2 (AA)` [(92)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts)
- [ ] **Garantir que listas tenham estrutura de lista** (`<ul>`, `<ol>`, `<li>`), facilitando a leitura por tecnologias assistivas.   `WCAG 1.3.1 (A)` [(93)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- [ ] **Garantir Título na Aba do Navegador (tag `<title>`) descritivo**, sendo único, curto, direto e sem termos genéricos.   `5.13.1/2.4.2 (A) ITRAC` [(94)](#)
- [ ] **Fornecer Documentação Clara** com passos claros e concretos, apresentada no contexto da tarefa que o usuário está realizando (se possível).   `H10` [(95)](#)
- [ ] **Garantir que mensagens de erro sejam claras, específicas e orientem a solução**.   `WCAG 3.3.1 (A)` [(96)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)

### Recomendações de Texto

- [ ] **Usar CamelCase em Hashtags** (ex: `#AcessibilidadeDigital`) para facilitar a leitura por leitores de tela.   `Guia UK` [(97)](#)
- [ ] **Manter o Uso de Emojis moderado**, garantindo que não tornem a leitura cansativa ou incompreensível para tecnologias assistivas.   `Guia UK` [(98)](#)
