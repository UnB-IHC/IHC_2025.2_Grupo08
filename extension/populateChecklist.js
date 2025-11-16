/**
     * AccessibleChecklist - cria itens de checklist acessíveis com tooltip/preview
     * - Cada item: checkbox + foco no rótulo revela a janela com NBR/WCAG + descrição simples
     * - tooltip aparece em hover e em foco (aria-hidden manejado)
     */
    class AccessibleChecklist {
      constructor(listEl){
        this.listEl = listEl;
      }
      addItem({id, label, nbrWcag, simple}) {
        const li = document.createElement('li');
        li.className = 'item';

        // checkbox
        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.id = 'chk-' + id;
        chk.className = 'checkbox';

        // label container
        const labelWrap = document.createElement('label');
        labelWrap.htmlFor = chk.id;
        labelWrap.className = 'label focusable';
        labelWrap.tabIndex = 0;
        labelWrap.setAttribute('role','button'); // clickable and focusable
        labelWrap.setAttribute('aria-expanded','false');

        // title line
        const titleLine = document.createElement('div');
        titleLine.className = 'title-line';

        const title = document.createElement('div');
        title.className = 'crit-title';
        title.textContent = label;

        const hint = document.createElement('div');
        hint.className = 'muted';
        hint.textContent = nbrWcag ? nbrWcag : 'Não Aplicável';

        titleLine.appendChild(title);
        titleLine.appendChild(hint);

        const simpleDesc = document.createElement('div');
        simpleDesc.className = 'sub';
        simpleDesc.textContent = simple ? simple : 'Não Aplicável';

        // preview (tooltip-like) — visible on focus/hover
        const metaWrap = document.createElement('div');
        metaWrap.className = 'meta-preview';
        const meta = document.createElement('div');
        meta.className = 'meta-popup';
        meta.setAttribute('role','dialog');
        meta.setAttribute('aria-hidden','true');

        const metaRow1 = document.createElement('div');
        metaRow1.className = 'meta-row';
        metaRow1.innerHTML = '<strong>Critério (NBR / WCAG):</strong> ' + (nbrWcag ? nbrWcag : 'Não Aplicável');

        const metaRow2 = document.createElement('div');
        metaRow2.className = 'meta-row';
        metaRow2.style.marginTop = '6px';
        metaRow2.innerHTML = '<strong>Descrição simples:</strong> ' + (simple ? simple : 'Não Aplicável');

        meta.appendChild(metaRow1);
        meta.appendChild(metaRow2);
        metaWrap.appendChild(meta);

        // interactions: hover + focus
        labelWrap.addEventListener('mouseenter', () => {
          meta.setAttribute('aria-hidden','false');
          labelWrap.setAttribute('aria-expanded','true');
        });
        labelWrap.addEventListener('mouseleave', () => {
          meta.setAttribute('aria-hidden','true');
          labelWrap.setAttribute('aria-expanded','false');
        });
        labelWrap.addEventListener('focus', () => {
          meta.setAttribute('aria-hidden','false');
          labelWrap.setAttribute('aria-expanded','true');
        });
        labelWrap.addEventListener('blur', () => {
          meta.setAttribute('aria-hidden','true');
          labelWrap.setAttribute('aria-expanded','false');
        });

        // keyboard: open/close with Enter or Space while focused on labelWrap (toggle checkbox)
        labelWrap.addEventListener('keydown', (e) => {
          if(e.key === ' ' || e.key === 'Enter'){
            e.preventDefault();
            chk.checked = !chk.checked;
          }
          if(e.key === 'Escape'){
            meta.setAttribute('aria-hidden','true');
            labelWrap.blur();
          }
        });

        labelWrap.appendChild(titleLine);
        labelWrap.appendChild(simpleDesc);
        labelWrap.appendChild(metaWrap);

        li.appendChild(chk);
        li.appendChild(labelWrap);
        this.listEl.appendChild(li);
      }
    }

$(function(){
    document.getElementById("projeto").addEventListener("click", () => {
        $("#checklist").load("partials/projectChecklist.html", () => {
            const gestao = new AccessibleChecklist(document.getElementById('list-gestao'));
            gestao.addItem({
              id: 'g-uk-init',
              label: 'Acessibilidade considerada desde a iniciação do projeto (Guia-UK)',
              nbrWcag: null,
              simple: 'A acessibilidade foi considerada desde o início do projeto.'
            });
            gestao.addItem({
              id: 'g-uk-du',
              label: 'Projeto segue conceitos de Desenho Universal (Guia-UK)',
              nbrWcag: null,
              simple: 'Busca soluções que atendam a todas as pessoas sem adaptações.'
            });
            gestao.addItem({
              id: 'g-uk-pcd',
              label: 'Inclusão de pessoas com deficiência na equipe/testes (Guia-UK)',
              nbrWcag: null,
              simple: 'PcD foram incluídas na equipe ou no grupo de teste.'
            });
            gestao.addItem({
              id: 'g-uk-personas',
              label: 'Personas incluem perfis heterogéneos (Guia-UK)',
              nbrWcag: null,
              simple: 'Personas consideram diferentes deficiências e letramento digital.'
            });
            gestao.addItem({
              id: 'g-monitor',
              label: 'Processo de monitoramento com ferramentas/checklists de acessibilidade (Guia-UK)',
              nbrWcag: null,
              simple: 'Existem processos e ferramentas de validação durante a execução.'
            });
            gestao.addItem({
              id: 'g-formacao',
              label: 'Equipe recebeu formação/conscientização sobre direitos das PcD (Guia-UK)',
              nbrWcag: null,
              simple: 'Equipe recebeu treinamento ou está consciente dos benefícios da acessibilidade.'
            });
            gestao.addItem({
              id: 'g-captcha',
              label: 'Se houver captchas, oferecem alternativas acessíveis (Guia-UK)',
              nbrWcag: null,
              simple: 'CAPTCHAs devem ter alternativas como áudio ou outras formas.'
            });
            gestao.addItem({
              id: 'g-no-magic',
              label: 'Evitar "ferramentas milagrosas" que prometem acessibilidade automática (Guia-UK)',
              nbrWcag: null,
              simple: 'Preferir código bem escrito e padrão em vez de plugins automáticos.'
            });

            // Desenvolvimento — listar critérios com código NBR/WCAG quando presente
            const dev = new AccessibleChecklist(document.getElementById('list-desenvolvimento'));
            dev.addItem({ id:'d-wcag-knowledge', label:'Equipe conhece diretrizes WCAG (Guia-UK)', nbrWcag: null, simple:'Equipe de dev conhece WCAG A/AA.'});
            dev.addItem({ id:'d-1.2', label:'1.2 Uso de foco', nbrWcag:'5.1.5 / WCAG 2.1.1 (A)', simple:'Todos os elementos interativos são utilizáveis por teclado (Tab, Shift+Tab, Enter, Espaço, setas).'});
            dev.addItem({ id:'d-1.3', label:'1.3 Armadilha de foco', nbrWcag:'5.1.6 / WCAG 2.1.2 (A)', simple:'Usuário não fica "preso" em elementos ao navegar com Tab.'});
            dev.addItem({ id:'d-1.4', label:'1.4 Ordem de foco previsível', nbrWcag:'2.4.3 (A)', simple:'Navegar entre elementos a focar é intuitivo e sequencial.'});
            dev.addItem({ id:'d-1.5', label:'1.5 Conteúdo adicional persistente e dispensável', nbrWcag:'1.4.13 (AA)', simple:'Conteúdo mostrado ao focar é dispensável ou removido ao perder foco.'});
            dev.addItem({ id:'d-1.6', label:'1.6 Instruções para componentes customizados', nbrWcag:'3.3.2 (A)', simple:'Componentes complexos têm instruções de operação.'});
            dev.addItem({ id:'d-6.3', label:'6.3 Cabeçalhos de tabela', nbrWcag:'5.6.3 / 1.3.1 (A)', simple:'Tabelas usam <th> para títulos de coluna/linha.'});
            dev.addItem({ id:'d-9.1', label:'9.1 Rótulo de campo', nbrWcag:'5.9.1 / 3.3.2 (A)', simple:'Campos de formulário têm rótulos visíveis (<label>), se aplicável.'});
            dev.addItem({ id:'d-14.4', label:'14.4 Controle de áudio', nbrWcag:'5.14.7 / 1.4.2 (A)', simple:'Se áudio/vídeo inicia automaticamente (>3s), existe botão para pausar/parar.'});
            dev.addItem({ id:'d-17.2', label:'17.2 Alternativas de interação', nbrWcag:'5.9.16 / 2.5.6 (AAA)', simple:'Opções de interação fáceis sem gestos complexos.'});
            dev.addItem({ id:'d-6.1', label:'6.1 Semântica de tabela', nbrWcag:'5.6.1 / 1.3.1 (A)', simple:'Tabelas de dados estão marcadas com <table>.'});
            dev.addItem({ id:'d-6.2', label:'6.2 Uso de tabelas', nbrWcag:'5.6.2 / 1.3.1 (A)', simple:'Tabelas são usadas apenas para dados, não layout.'});
            dev.addItem({ id:'d-6.4', label:'6.4 Descrição para tabelas complexas (recomendação)', nbrWcag:'5.6.6 / 3.1.5 (AAA)', simple:'Tabelas complexas devem ter descrição textual.'});
            dev.addItem({ id:'d-9.4', label:'9.4 Minimização de redundância', nbrWcag:'5.9.15 / 3.3.7 (A)', simple:'Evitar pedir informações já fornecidas na sessão.'});
            dev.addItem({ id:'d-9.5', label:'9.5 Prevenção de erro para formulários críticos', nbrWcag:'5.9.12 / 3.3.4 (AA)', simple:'Formulários críticos podem ser revertidos.'});
            dev.addItem({ id:'d-9.6', label:'9.6 Validação sensorial ou por movimento', nbrWcag:'5.9.16 / 1.1.1;2.5.4;2.5.6', simple:'Alternativas a formulários que exijam percepção sensorial ou movimento.'});
            dev.addItem({ id:'d-4.1', label:'4.1 Semântica de região', nbrWcag:'5.4.1 / 1.3.1 (A)', simple:'Áreas principais marcadas (<nav>, <main>, <footer> ou role).'});
            dev.addItem({ id:'d-4.2', label:'4.2 Uso de regiões', nbrWcag:'5.4.2 / 1.3.1 (A), 1.3.6 (AAA)', simple:'Link "Pular para o conteúdo" ou "Ignorar repetição" disponível.'});
            dev.addItem({ id:'d-4.3', label:'4.3 Regiões identificadas unicamente', nbrWcag:'5.4.5 / 4.1.2 (A)', simple:'Regiões do mesmo tipo possuem nome único e acessível.'});
            dev.addItem({ id:'d-5.1', label:'5.1 Semântica de lista', nbrWcag:'5.5.1 / 1.3.1 (A)', simple:'Itens agrupados estão marcados como listas (<ul>/<ol>/<li>).'});
            dev.addItem({ id:'d-5.2', label:'5.2 Uso de listas', nbrWcag:'5.5.2 / 1.3.1 (A)', simple:'Usar código de lista para agrupar, não só efeito visual.'});
            dev.addItem({ id:'d-7.1', label:'7.1 Semântica de links', nbrWcag:'5.7.1 / 1.3.1 (A)', simple:'Textos que levam a outros recursos são marcados com <a href>. '});
            dev.addItem({ id:'d-7.3', label:'7.3 Navegação', nbrWcag:'2.4.5 (AA)', simple:'Existem pelo menos duas formas de localizar páginas no site.'});
            dev.addItem({ id:'d-8.1', label:'8.1 Semântica de botão', nbrWcag:'4.1.2 (A)', simple:'Elementos que executam ação são marcados como <button> ou role=button.'});
            dev.addItem({ id:'d-13.2', label:'13.2 Idioma da página', nbrWcag:'3.1.1 (A)', simple:'Código informa o idioma principal (<html lang="pt-BR">).'});
            dev.addItem({ id:'d-13.3', label:'13.3 Zoom não bloqueado', nbrWcag:'1.4.4 (AA)', simple:'Site permite zoom (não bloquear user-scalable).'});
            dev.addItem({ id:'d-13.4', label:'13.4 Ordem de leitura', nbrWcag:'1.3.2 (A)', simple:'Ordem de leitura do leitor de tela segue ordem lógica da tela.'});
            dev.addItem({ id:'d-13.5', label:'13.5 Texto visível no nome acessível', nbrWcag:'2.5.3 (A)', simple:'Texto visual de botão é o mesmo lido por leitor de telas.'});
            dev.addItem({ id:'d-13.6', label:'13.6 Mensagens de status', nbrWcag:'4.1.3 (AA)', simple:'Mudanças na página geram avisos ao leitor de tela sem perda de foco.'});
            dev.addItem({ id:'d-15.1', label:'15.1 Animação por interação', nbrWcag:'2.3.3 (AAA)', simple:'Há forma de desativar animações acionadas ao rolar, se houver.'});
            dev.addItem({ id:'d-15.2', label:'15.2 Controle de tempo', nbrWcag:'2.2.1 (A)', simple:'Se há limite, sistema avisa e permite estender o tempo.'});
            dev.addItem({ id:'d-15.3', label:'15.3 Pausa de movimento', nbrWcag:'2.2.2 (A)', simple:'Botões visíveis para pausar/parar movimentos automáticos.'});
            dev.addItem({ id:'d-17.1', label:'17.1 Controle de gestos', nbrWcag:'2.5.2 (A)', simple:'Gesto que causa ação pede confirmação ou permite desfazer.'});
            dev.addItem({ id:'d-9.7', label:'9.7 Valores padrão', nbrWcag:'Heurística H5', simple:'Sistema oferece bons valores padrão para minimizar erro.'});

            // Design
            const design = new AccessibleChecklist(document.getElementById('list-design'));
            design.addItem({ id:'ds-1.1', label:'1.1 Indicador de foco visível', nbrWcag:'5.1.1 / 2.4.7 (AA)', simple:'Ao navegar com Tab, é claro qual elemento está selecionado.'});
            design.addItem({ id:'ds-9.2', label:'9.2 Mensagem de erro descritiva', nbrWcag:'5.9.9 / 3.3.1 (A)', simple:'Sistema indica qual campo está errado e o que fazer.'});
            design.addItem({ id:'ds-9.3', label:'9.3 Sugestão de correção', nbrWcag:'5.9.10 / 3.3.3 (AA)', simple:'Ao detectar erro, sistema sugere como corrigir.'});
            design.addItem({ id:'ds-11.2', label:'11.2 Contraste para texto', nbrWcag:'5.11.2 / 1.4.3 (AA)', simple:'Contraste entre texto e fundo atende 4.5:1.'});
            design.addItem({ id:'ds-11.3', label:'11.3 Contraste para componentes', nbrWcag:'5.11.4 / 1.4.11 (AA)', simple:'Bordas de campos e limites de botões têm contraste mínimo 3:1.'});
            design.addItem({ id:'ds-11.4', label:'11.4 Contraste para objetos gráficos', nbrWcag:'5.11.5 / 1.4.11 (AA)', simple:'Ícones e gráficos importantes têm contraste adequado.'});
            design.addItem({ id:'ds-11.5', label:'11.5 Contraste para indicador de foco', nbrWcag:'5.11.6 / 1.4.11 (AA)', simple:'Indicador de foco tem contraste suficiente (>=3:1).'});
            design.addItem({ id:'ds-7.6', label:'7.6 Links para contornar blocos de conteúdo', nbrWcag:'5.7.11 / 2.4.1 (A)', simple:'Existem atalhos para contornar conteúdo repetido (ex: "pular para o conteúdo").'});
            design.addItem({ id:'ds-8.4', label:'8.4 Mudança de contexto previsível no foco', nbrWcag:'5.8.9 / 3.2.1 (AA)', simple:'Componentes não são acionados apenas por foco.'});
            design.addItem({ id:'ds-10.1', label:'10.1 Design responsivo', nbrWcag:'5.10.4 / 1.4.10 (AA)', simple:'Conteúdo se reorganiza em uma única coluna em telas pequenas.'});
            design.addItem({ id:'ds-12.1', label:'12.1 Redimensionamento de texto', nbrWcag:'5.12.7 / 1.4.4 (AA)', simple:'É possível aumentar zoom (200%) sem que o layout quebre.'});
            design.addItem({ id:'ds-12.2', label:'12.2 Espaçamento entre linhas', nbrWcag:'5.12.1 / 1.4.12 (AA)', simple:'Espaçamento entre linhas deve ser ao menos 1.5x, se aplicável.'});
            design.addItem({ id:'ds-12.3', label:'12.3 Espaçamento entre parágrafos', nbrWcag:'5.12.2 / 1.4.12 (AA)', simple:'Espaçamento após parágrafo deve ser adequado.'});
            design.addItem({ id:'ds-12.4', label:'12.4 Espaçamento entre letras', nbrWcag:'5.12.3 / 1.4.12 (AA)', simple:'Espaçamento entre letras >= 0.12x tamanho da fonte.'});
            design.addItem({ id:'ds-12.5', label:'12.5 Espaçamento entre palavras', nbrWcag:'5.12.4 / 1.4.12 (AA)', simple:'Espaçamento entre palavras >= 0.16x tamanho da fonte.'});
            design.addItem({ id:'ds-16.1', label:'16.1 Sem mudança no foco/input', nbrWcag:'5.8.9 / 3.2.1, 3.2.2', simple:'Site não move elementos ou abre pop-ups apenas por foco.'});
            design.addItem({ id:'ds-16.2', label:'16.2 Consistência de navegação', nbrWcag:'5.7.15 / 3.2.3 (AA)', simple:'Menus importantes funcionam da mesma forma em todas as páginas.'});
            design.addItem({ id:'ds-16.3', label:'16.3 Consistência da ajuda', nbrWcag:'5.7.16 / 3.2.6 (A)', simple:'Elementos de ajuda são consistentes e fáceis de achar.'});
            design.addItem({ id:'ds-13.7', label:'13.7 Status atual (Heurística H1)', nbrWcag:'H1', simple:'Usuário é informado sobre seu estado atual no sistema.'});
            design.addItem({ id:'ds-16.4', label:'16.4 Reconhecimento em vez de recordação (H6)', nbrWcag:'H6', simple:'Opções e instruções estão visíveis sem exigir memorização.'});
            design.addItem({ id:'ds-16.5', label:'16.5 Design Estético e Minimalista (H8)', nbrWcag:'H8', simple:'Interface contém apenas informações relevantes.'});
            design.addItem({ id:'ds-gui-avoid', label:'Guia UK: Evitar esconder conteúdo da tecnologia assistiva', nbrWcag:null, simple:'Evitar uso indevido de display:none/visibility:hidden em conteúdo relevante.'});

            // Conteúdo
            const conteudo = new AccessibleChecklist(document.getElementById('list-conteudo'));
            conteudo.addItem({ id:'c-3.1', label:'3.1 Semântica de cabeçalho', nbrWcag:'1.3.1 (A)', simple:'Títulos e subtítulos marcados com <h1>.. <h6>.'});
            conteudo.addItem({ id:'c-3.2', label:'3.2 Uso de cabeçalhos', nbrWcag:'1.3.1 (A)', simple:'Cabeçalhos identificam seções, não só estilo.'});
            conteudo.addItem({ id:'c-3.3', label:'3.3 Estrutura de cabeçalhos', nbrWcag:'2.4.6 (AA)', simple:'Ordem dos cabeçalhos é lógica e consistente.'});
            conteudo.addItem({ id:'c-3.4', label:'3.4 Organização', nbrWcag:'1.3.1 (A)', simple:'Informações organizadas com títulos e seções.'});
            conteudo.addItem({ id:'c-7.2', label:'7.2 Uso de links', nbrWcag:'2.4.4 (A)', simple:'Texto do link descreve claramente o destino.'});
            conteudo.addItem({ id:'c-2.1', label:'2.1 Textos alternativos', nbrWcag:'1.1.1 (A)', simple:'Imagens que transmitem informação têm alt; decorativas alt="".'});
            conteudo.addItem({ id:'c-2.2', label:'2.2 Alternativa para conteúdo visual', nbrWcag:'1.1.1 (A)', simple:'Criar alternativas em texto para conteúdo visual/auditivo.'});
            conteudo.addItem({ id:'c-14.1', label:'14.1 Alternativa em texto para áudio', nbrWcag:'1.2.1 (A)', simple:'Áudio tem transcrição completa.'});
            conteudo.addItem({ id:'c-14.2', label:'14.2 Legendas descritivas', nbrWcag:'1.2.2 (A)', simple:'Vídeos com falas possuem legendas sincronizadas.'});
            conteudo.addItem({ id:'c-14.3', label:'14.3 Audiodescrição', nbrWcag:'1.2.5 (AA)', simple:'Vídeos sem fala importante têm audiodescrição.'});
            conteudo.addItem({ id:'c-14.5', label:'14.5 Transcrições e alternativas', nbrWcag:'1.2.3 (A)', simple:'Conteúdo dependente de um sentido possui alternativa.'});
            conteudo.addItem({ id:'c-7.4', label:'7.4 Links compreensíveis (Leitor de Tela)', nbrWcag:'2.4.4 (A)', simple:'Links são compreensíveis quando lidos isoladamente.'});
            conteudo.addItem({ id:'c-7.5', label:'7.5 Links com identificação consistente', nbrWcag:'3.2.4 (AA)', simple:'Links que levam a lugares diferentes têm nomes diferentes.'});
            conteudo.addItem({ id:'c-8.2', label:'8.2 Uso de botões', nbrWcag:'4.1.2 (A)', simple:'Botões têm nome acessível que descreve função.'});
            conteudo.addItem({ id:'c-8.3', label:'8.3 Propósito do botão', nbrWcag:'3.3.2 (A)', simple:'Função do botão é clara com palavras simples.'});
            conteudo.addItem({ id:'c-13.1', label:'13.1 Título da página', nbrWcag:'2.4.2 (A)', simple:'Título da aba descreve o conteúdo e é único.'});
            conteudo.addItem({ id:'c-18.2', label:'18.2 Documentação clara e contextual (H10)', nbrWcag:'H10', simple:'Documentação apresenta passos claros no contexto da tarefa.'});
            conteudo.addItem({ id:'c-gui-hashtag', label:'Guia-UK: Hashtags em CamelCase', nbrWcag:null, simple:'Usar CamelCase em hashtags para leitura por leitores de tela.'});
            conteudo.addItem({ id:'c-gui-emoji', label:'Guia-UK: Uso moderado de emojis', nbrWcag:null, simple:'Evitar excesso de emojis que atrapalhem leitura por AT.'});
        }); 
    });
})

