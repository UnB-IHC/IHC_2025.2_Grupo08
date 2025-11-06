### Guia de Acessibilidade Digital

## O que é?
O Guia de Acessibilidade Digital é um documento que reúne diretrizes, normas e boas práticas voltadas à criação de experiências digitais mais inclusivas. Ele serve como referência para orientar a implementação de melhorias de acessibilidade de forma prática, clara e organizada.

Neste docuemnto, o guia será estruturado em seções que facilitam a navegação e a compreensão, incluindo: incluir topicos e referências.

Essa organização permite que qualquer usuário ou desenvolvedor consiga consultar rapidamente os pontos necessários para tornar uma interface digital mais acessível.

## Checklist de Acessibilidade (Base ABNT NBR 17225)

> Este checklist segue a sua priorização de critérios (AA preferencial, A se for o único, AAA se for A+AAA) para uma verificação prática.

---

# 1. Interação por teclado

- [ ] **[1.1 (Doc NBR) Indicador de foco visível | 2.4.7 (AA)]**: Ao navegar com a tecla "Tab", consigo ver claramente qual elemento está selecionado (um contorno ou destaque visível)?
- [ ] **[1.2 (Doc NBR) Uso de foco | 2.1.1 (A)]**: Consigo usar todos os elementos interativos (links, botões, menus, formulários) usando apenas o teclado (Tab, Shift+Tab, Enter, Espaço, Teclas de Seta)?
- [x] **[1.3 (ITRAC) Armadilha de foco | 2.1.2 (A)]**: (ITRAC) O usuário não fica "preso" em nenhum elemento (como pop-ups ou menus) ao navegar com "Tab"? Ele consegue sair e continuar navegando pela página?
- [x] **[1.4 (Doc NBR) Ordem de foco previsível | 2.4.3 (A)]**: É possível navegar entre elementos a focar de forma intuitiva e sequencial?
- [x] **[1.5 (Doc NBR) Conteúdo adicional persistente e dispensável | 1.4.13 (AA)]**: O conteúdo mostrado ao focar em um elemento é dispensável ou, caso persistente, apenas é dispensado após elemento perder foco ou mensagem se tornar inválida?
- [x] **[1.6 (Doc NBR) Instruções para componentes customizados | 3.3.2 (A)]**: Componentes com comportamentos complexos ou não previsíveis possuem instruções para operação?

# 2. Imagens

- [ ] **[2.1 (Doc NBR) Textos alternativos | 1.1.1 (A)]**: Todas as imagens que transmitem informação têm um texto alternativo (alt) que descreve o que elas significam? Imagens puramente decorativas têm alt="" (vazio)?
- [ ] **[2.2 (ITRAC) Alternativa para conteúdo visual | 1.1.1 (A)]**: (ITRAC) É criada uma alternativa em texto para todo conteúdo visual ou auditivo que não seja puramente textual?

# 3. Cabeçalhos

- [ ] **[3.1 (Doc NBR) Semântica de cabeçalho | 1.3.1 (A)]**: Os textos que parecem ser títulos e subtítulos estão marcados no código como cabeçalhos (tags <h1> a <h6>)?
- [x] **[3.2 (Doc NBR) Uso de cabeçalhos | 1.3.1 (A)]**: Os cabeçalhos são usados para identificar seções do conteúdo, e não apenas para deixar o texto maior ou em negrito?
- [ ] **[3.3 (Doc NBR) Estrutura de cabeçalhos | 2.4.6 (AA)]**: A ordem dos cabeçalhos faz sentido? (Começa com <h1> para o título principal, seguido por <h2> para seções, <h3> para subseções, sem pular níveis)?
- [x] **[3.4 (ITRAC) Organização | 1.3.1 (A)]**: (ITRAC) As informações estão organizadas de forma clara, com títulos, subtítulos e seções bem definidos?

# 4. Regiões

- [ ] **[4.1 (Doc NBR) Semântica de região | 1.3.1 (A)]**: As áreas principais da página (como cabeçalho, menu principal, conteúdo principal, barra de busca e rodapé) estão identificadas no código (com tags como <nav>, <main>, <footer> ou role="...")?
- [ ] **[4.2 (Doc NBR) Uso de regiões | 2.4.1 (A)]**: Existe um link "Pular para o conteúdo" no topo da página? (ITRAC Detalhe) Esse link (ou "Ignorar repetição") aparece assim que o usuário começa a navegar com "Tab"?
- [x] **[4.3 (Doc NBR) Regiões identificadas unicamente | 4.1.2 (A)]**: Todas as regiões do mesmo tipo possuem um nome único e acessível?

# 5. Listas

- [ ] **[5.1 (Doc NBR) Semântica de lista | 1.3.1 (A)]**: Itens agrupados (como uma lista de ingredientes ou passos de um tutorial) estão marcados no código como uma lista (<ul>, <ol>, <li>)?
- [ ] **[5.2 (Doc NBR) Uso de listas | 1.3.1 (A)]**: O código de lista é usado para agrupar itens semelhantes, e não apenas para conseguir um efeito visual (como indentação)?

# 6. Tabelas

- [x] **[6.1 (Doc NBR) Semântica de tabela | 1.3.1 (A)]**: As tabelas que mostram dados (como uma tabela de preços) estão marcadas no código com a tag <table>?
- [x] **[6.2 (Doc NBR) Uso de tabelas | 1.3.1 (A)]**: As tabelas são usadas apenas para mostrar dados, e não para organizar o layout visual da página (como criar colunas)?
- [x] **[6.3 (Doc NBR) Cabeçalhos de tabela | 1.3.1 (A)]**: Os títulos das colunas e/ou linhas da tabela estão marcados no código como cabeçalhos (tag <th>) para que os leitores de tela possam associar os dados?
- [x] **[6.4 (Doc NBR) Descrição para tabelas complexas Recomendação | 3.1.5 (AAA)]**: Todas as tabelas complexas possuem descrição em texto?

# 7. Links e navegação

- [x] **[7.1 (Doc NBR) Semântica de link | 1.3.1 (A)]**: O texto que leva para outra página ou recurso está marcado no código como um link (tag <a> com href)?
- [x] **[7.2 (Doc NBR) Uso de links | 2.4.4 (A)]**: O texto do link descreve claramente para onde ele leva? (Evitar "Clique aqui"). (ITRAC Detalhe) São simples, claros (como "nossos serviços") e, se curtos, explicados pelo contexto?
- [ ] **[7.3 (Doc NBR) Navegação | 2.4.5 (AA)]**: Existem pelo menos duas formas de encontrar uma página no site? (Ex: Pelo menu principal E por um mapa do site, OU pelo menu E por uma busca).
- [x] **[7.4 (ITRAC) Links compreensíveis (Leitor de Tela) | 2.4.4 (A)]**: (ITRAC) Os links são compreensíveis mesmo quando lidos isoladamente por um leitor de telas?
- [x] **[7.5 (Doc NBR) Links com identificação consistente | 3.2.4 (AA), 2.4.9 (AAA)]**: Todos os links que levam a lugares diferentes possuem nomes diferentes?
- [ ] **[7.6 (Doc NBR) Links para contornar blocos de conteúdo... | 2.4.1 (A)]**: Posso acessar uma parte específica do site entre partes padrão ou repetidas através de um botão (por exemplo: index, voltar ao topo)?
- [x] **[7.7 (Docs NBR) Ajuda consistente | 3.2.6 (A)]**: Os mecanismos de ajuda estão sempre no mesmo lugar, não importa qual página acesse do site?

# 8. Botões e controles

- [ ] **[8.1 (Doc NBR) Semântica de botão | 4.1.2 (A)]**: Elementos que executam uma ação na página (como "Enviar", "Buscar", "Fechar") estão marcados no código como botões (tag <button> ou role="button")?
- [ ] **[8.2 (Doc NBR) Uso de botões | 4.1.2 (A)]**: Todo botão ou controle tem um nome acessível que descreve sua função? (ITRAC Detalhe) Controles (barras de progresso, volume) informam seu valor/estado ao leitor de tela?
- [ ] **[8.3 (Doc NBR) Propósito do botão | 3.3.2 (A)]**: O que o botão faz está claro? (ITRAC Detalhe) São usadas palavras simples e claras e, se necessário, há uma explicação?
- [ ] **[8.4 (Doc NBR) Mudança de contexto previsível no foco | 3.2.1 (AA)]**: Componentes não são acionados apenas por foco de cursor?

# 9. Formulários e entrada de dados

- [ ] **[9.1 (Doc NBR) Rótulo de campo | 3.3.2 (A)]**: Todo campo de formulário (texto, checkbox, radio) tem um rótulo (etiqueta) visível (tag <label>) que diz o que deve ser preenchido?
- [ ] **[9.2 (Doc NBR) Mensagem de erro descritiva | 3.3.1 (A)]**: Se eu preencher algo errado, o sistema me avisa qual campo está errado e o que está errado? (ITRAC Detalhe) O erro é indicado por mais de um recurso (cor + texto, ícone + texto, alerta sonoro, etc.)?
- [ ] **[9.3 (Doc NBR) Sugestão de correção | 3.3.3 (AA)]**: Quando um erro de preenchimento é detectado, o sistema dá uma sugestão de como corrigi-lo? (Ex: "Formato de data inválido. Use DD/MM/AAAA").
- [ ] **[9.4 (ITRAC) Minimização de redundância | 3.3.7 (AAA)]**: (ITRAC) O formulário evita pedir informações que o usuário já forneceu nesta mesma sessão? (Regra: $A+AAA=AAA)$
- [ ] **[9.5 (Doc NBR) Prevenção de erro para formulários críticos | 3.3.4 (AA)]**: Formulários críticos podem ser revertidos?
- [ ] **[9.6 (Doc NBR) Validação sensorial ou por movimento | 1.1.1 (A), 2.5.4 (A), 2.5.6(AAA)]**: Há alguma alternativa a formulário que não exija percepção ou capacidade motora?
- [ ] **[9.7 (Heuristica 5) Valores padrão | H5]**: O sistema oferece bons valores padrão (default) para minimizar a chance de erro no preenchimento?

# 10. Apresentação

- [x] **[10.1 (Doc NBR) Design responsivo | 1.4.10 (AA)]**: Em uma tela pequena (como celular) ou ao dar muito zoom, o conteúdo se reorganiza em uma única coluna e eu não preciso rolar a tela para os lados (horizontalmente) para ler?

# 11. Uso de cores

- [ ] **[11.1 (Doc NBR) Uso de cores | 1.4.1 (A)]**: A cor não é a única forma de passar uma informação? (Ex: erro não é só vermelho). (ITRAC Detalhe) As instruções não dependem de sensoriais (cor, posição, forma) (Ex: "Clique no botão à esquerda")?
- [ ] **[11.2 (Doc NBR) Contraste para texto | 1.4.3 (AA)]**: O contraste entre a cor do texto e a cor do fundo é forte o suficiente? (Pelo menos 4.5:1). (ITRAC Detalhe) Evita texto claro em fundo claro ou escuro em fundo escuro?
- [ ] **[11.3 (Doc NBR) Contraste para componentes | 1.4.11 (AA)]**: As bordas de campos de formulário e os limites de botões têm contraste suficiente (pelo menos 3:1)? (ITRAC Detalhe) Botões e links se destacam bem?
- [ ] **[11.4 (Doc NBR) Contraste para objetos gráficos | 1.4.11 (AA)]**: Ícones e partes importantes de gráficos têm contraste suficiente (pelo menos 3:1)? (ITRAC Detalhe) Não usa só cores parecidas (verde claro e amarelo claro) para info importante?
- [ ] **[11.5 (Doc NBR) Contraste para indicador de foco | 1.4.11 (AA)]**: O indicador de foco (do item 1.1) tem contraste suficiente (pelo menos 3:1) com o que está ao seu redor?

# 12. Conteúdo textual

- [x] **[12.1 (Doc NBR) Redimensionamento de texto | 1.4.4 (AA)]**: Consigo aumentar o zoom do navegador (para 200%) sem que o texto se sobreponha, desapareça ou quebre o layout da página?
- [ ] **[12.2 (Doc NBR) Espaçamento entre linhas | 1.4.12 (AA)]**: O espaçamento entre as linhas de um texto é de pelo menos 1,5 vezes o tamanho da fonte?
- [ ] **[12.3 (Doc NBR) Espaçamento entre parágrafos | 1.4.12 (AA)]**: O espaçamento após um parágrafo é de pelo menos 2 vezes o tamanho da fonte?
- [ ] **[12.4 (Doc NBR) Espaçamento entre letras | 1.4.12 (AA)]**: O espaçamento entre as letras é de pelo menos 0,12 vezes o tamanho da fonte?
- [ ] **[12.5 (Doc NBR) Espaçamento entre palavras | 1.4.12 (AA)]**: O espaçamento entre as palavras é de pelo menos 0,16 vezes o tamanho da fonte?

# 13. Codificação e marcação semântica

- [x] **[13.1 (Doc NBR) Título da página | 2.4.2 (A)]**: O título na aba do navegador (tag <title>) descreve o conteúdo? (ITRAC Detalhe) É único, curto, direto e não usa termos genéricos?
- [x] **[13.2 (Doc NBR) Idioma da página | 3.1.1 (A)]**: O código da página informa o idioma principal (ex: <html lang="pt-BR">) para que os leitores de tela usem a pronúncia correta?
- [x] **[13.3 (Doc NBR) Zoom não bloqueado | 1.4.4 (AA)]**: O site permite que eu use o gesto de "pinça" para dar zoom em telas de celular? (O código não deve ter user-scalable=no).
- [ ] **[13.4 (Doc NBR) Ordem de leitura | 1.3.2 (A)]**: A ordem que um leitor de tela lê o conteúdo segue a mesma ordem lógica que vemos na tela? (ITRAC Detalhe) A sequência do "Tab" é previsível, intuitiva e segue o fluxo (cima/baixo, esq/dir)?
- [ ] **[13.5 (Doc NBR) Texto visível no nome acessível | 2.5.3 (A)]**: Se um botão tem o texto "Ver mais", o nome acessível (aria-label) dele também contém "Ver mais"?
- [ ] **[13.6 (Doc NBR) Mensagem de status | 4.1.3 (AA)]**: Se algo muda na página (como um resultado de busca ou alerta), o sistema avisa o usuário sobre essa mudança automaticamente, sem que ele perca o foco?
- [x] **[13.7 (Heurística 1) Status atual | H1]**: O usuário é informado sobre o seu estado atual no sistema (Ex: "Você está aqui", "Passo 2 de 5")?

# 14. Áudio e vídeo

- [ ] **[14.1 (Doc NBR) Alternativa em texto para áudio | 1.2.1 (A)]**: Se houver um áudio (como um podcast), existe uma transcrição em texto de tudo o que foi dito?
- [ ] **[14.2 (Doc NBR) Legendas descritivas | 1.2.2 (A)]**: Se houver um vídeo com falas, ele possui legendas sincronizadas (de preferência descritivas, que incluem sons importantes)?
- [ ] **[14.3 (Doc NBR) Audiodescrição | 1.2.5 (AA)]**: Se houver um vídeo onde informações visuais importantes acontecem sem fala, existe uma faixa de áudio extra (audiodescrição) que narra essas ações?
- [ ] **[14.4 (Doc NBR) Controle de áudio | 1.4.2 (A)]**: Se um áudio (ou vídeo) começa a tocar sozinho por mais de 3 segundos, existe um botão fácil de achar para pausar, parar ou controlar o volume?
- [ ] **[14.5 (ITRAC) Transcrições e Alternativas | 1.2.3 (A)]**: (ITRAC) O conteúdo que depende de um só sentido (áudio ou vídeo) possui alternativas? (Ex: Transcrição para áudio, descrição textual ou falada para vídeo).

# 15. Animação e Tempo

- [ ] **[15.1 (Doc NBR) Animação por interação | 2.3.3 (AAA)]**: Se houver animações de movimento que disparam quando eu rolo a página (scroll), existe uma forma de desativá-las? (Regra: A+AAA = AAA)
- [ ] **[15.2 (Doc NBR) Controle de Tempo | 2.2.1 (A)]**: Se a página tem um limite de tempo (como "sua sessão vai expirar"), o sistema avisa e me permite estender esse tempo facilmente?
- [ ] **[15.3 (ITRAC) Pausa de movimento | 2.2.2 (A)]**: (ITRAC) Existem botões visíveis para pausar ou parar movimentos que começam automaticamente (como carrosséis ou animações)? E esses controles funcionam com leitores de tela?

# 16. (ITRAC) Consistência e Previsibilidade

- [ ] **[16.1 (ITRAC) Sem mudança no foco/input | 3.2.1 (A), 3.2.2 (AA)]**: (ITRAC) O site não muda de lugar ou abre pop-ups sozinho apenas por eu colocar o foco em um campo ou preencher um formulário?
- [x] **[16.2 (ITRAC) Consistência de navegação | 3.2.3 (AA)]**: (ITRAC) As ações e menus importantes (como o menu principal) funcionam da mesma forma em todas as páginas do site?
- [ ] **[16.3 (ITRAC) Consistência da ajuda | 3.2.6 (A)]**: (ITRAC) Os elementos de ajuda (ícones, links, botões) estão consistentes e fáceis de achar em todas as públicas?
- [x] **[16.4 (Heurística 6) Reconhecimento em vez de recordação | H6]**: As opções, ações e instruções estão visíveis na tela, sem que o usuário precise memorizar informações entre telas?
- [x] **[16.5 (Heurística 8) Design Estético e Minimalista | H8]**: A interface contém apenas informações relevantes e necessárias para a tarefa atual?

# 17. (ITRAC) Interação

- [ ] **[17.1 (ITRAC) Controle de gestos | 2.5.2 (A)]**: (ITRAC) Se um gesto (deslizar, pressionar) causa uma ação, o site pede confirmação ou permite desfazer a ação para evitar erros?
- [ ] **[17.2 (ITRAC) Alternativas de interação | 2.5.6 (AAA)]**: (ITRAC) As opções (botões, links) são fáceis de encontrar e usar sem depender de gestos complexos (são clicáveis)? (Regra: A+AAA = AAA)

# 18. (ITRAC) Formatação de Ajuda

- [ ] **[18.1 (ITRAC) Tipos de ajuda | 3.3.8 (AAA)]**: (ITRAC) O site oferece opções de ajuda que incluem contato humano (email, telefone) e, se possível, automatizadas (chatbots, FAQ)? (Regra: A+AAA = AAA)
- [ ] **[18.2 (Heurística 10) Documentação clara e contextual | H10]**: A documentação oferece passos claros e concretos? Ela é apresentada no contexto da tarefa que o usuário está tentando realizar (se possível)?
