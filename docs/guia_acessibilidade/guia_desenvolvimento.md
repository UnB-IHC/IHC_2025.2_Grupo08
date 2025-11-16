# Checklist de Desenvovlimento

## Foco, Navegação e Teclado
- [ ] **Garantir navegação por teclado** em todos os elementos interativos.  
  `WCAG 2.1.1 (A)` [(1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)

- [ ] **Evitar armadilhas de foco**, permitindo sair de qualquer elemento usando Tab.  
  `WCAG 2.1.2 (A)` [(2)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap)

- [ ] **Manter ordem de foco previsível** e lógica.  
  `WCAG 2.4.3 (A)` [(3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)

- [ ] **Exibir ou ocultar conteúdo extra no foco** conforme as regras de acessibilidade.  
  `WCAG 1.4.13 (AA)` [(4)](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus)

- [ ] **Oferecer instruções para componentes customizados**.  
  `WCAG 3.3.2 (A)` [(5)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)

---

## Tabelas
- [ ] **Usar `<th>`** para cabeçalhos de tabela.  
  `WCAG 1.3.1 (A)` [(6)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)

- [ ] **Evitar tabelas para layout**.  
  `WCAG 1.3.1 (A)` [(7)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)

- [ ] **Incluir descrição** em tabelas complexas.  
  `WCAG 3.1.5 (AAA)` [(8)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose)

---

## Formulários
- [ ] **Garantir `<label>` para todos os campos**.  
  `WCAG 3.3.2 (A)` [(9)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)

- [ ] **Evitar pedir informações repetidas**.  
  `WCAG 3.3.7 (A)` [(10)](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry)

- [ ] **Permitir reverter formulários críticos**.  
  `WCAG 3.3.4 (AA)` [(11)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data)

- [ ] **Oferecer alternativa a validação por percepção ou movimento**.  
  `WCAG 2.5.4 (A)` [(12)](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation)

---

## Regiões
- [ ] **Usar `<nav>`, `<main>`, `<footer>` e landmarks corretos**.  
  `WCAG 1.3.1 (A)` [(13)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)

- [ ] **Adicionar “Pular para o conteúdo”**.  
  `WCAG 2.4.1 (A)` [(14)](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks)

- [ ] **Identificar regiões com nomes únicos**.  
  `WCAG 4.1.2 (A)` [(15)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

---

## Listas e Links
- [ ] **Usar `<ul>`, `<ol>` e `<li>` corretamente**.  
  `WCAG 1.3.1 (A)` [(16)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)

- [ ] **Links devem ser claros e semânticos** usando `<a>`.  
  `WCAG 2.4.4 (A)` [(17)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)

- [ ] **Pelo menos duas formas de navegar pelo conteúdo**.  
  `WCAG 2.4.5 (AA)` [(18)](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways)

---

## Botões e Controles
- [ ] **Usar `<button>` ou `role="button"` em elementos interativos**.  
  `WCAG 4.1.2 (A)` [(19)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

---

## Idioma, Zoom e Leitura
- [ ] **Definir o idioma da página com `lang="pt-BR"`**.  
  `WCAG 3.1.1 (A)` [(20)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page)

- [ ] **Permitir zoom sem bloqueio**.  
  `WCAG 1.4.4 (AA)` [(21)](https://www.w3.org/WAI/WCAG22/Understanding/resize-text)

- [ ] **Ordem de leitura lógica no HTML**.  
  `WCAG 1.3.2 (A)` [(22)](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)

---

## Multimídia
- [ ] **Controle para pausar áudio/vídeo automático**.  
  `WCAG 1.4.2 (A)` [(23)](https://www.w3.org/WAI/WCAG22/Understanding/audio-control)

---

## Movimento, Tempo e Gestos
- [ ] **Permitir desativar animações de rolagem**.  
  `WCAG 2.3.3 (AAA)` [(24)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)

- [ ] **Permitir estender tempo de sessão**.  
  `WCAG 2.2.1 (A)` [(25)](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable)

- [ ] **Botão para pausar animações automáticas**.  
  `WCAG 2.2.2 (A)` [(26)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)

- [ ] **Gestos complexos possuem alternativa simples**.  
  `WCAG 2.5.2 (A)` [(27)](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation)

---

## Heurísticas e Recomendações
- [ ] **O sistema oferece valores padrão adequados**.  
  Heurística 5 [(28)](https://www.nngroup.com/articles/ten-usability-heuristics/)

- [ ] **Captchas têm alternativas acessíveis (áudio, texto etc.)**.  
  Guia-UK [(29)](#)

- [ ] **Evitar plugins que prometem acessibilidade automática**.  
  Guia-UK [(30)](#)
