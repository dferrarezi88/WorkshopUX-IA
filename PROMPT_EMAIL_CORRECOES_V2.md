# CORREÇÃO DO MÓDULO DE E-MAIL
# Cole esse prompt no Claude Code (cursor >)

## CONTEXTO
O módulo de e-mail foi implementado mas precisa de ajustes para ficar
idêntico às imagens de referência. Leia as imagens antes de qualquer alteração.

## PASSO 1 — LEIA AS REFERÊNCIAS VISUAIS

Leia todas as imagens nesta ordem e use como verdade absoluta de layout:
- ./design-reference/email/01-home-widget.png
- ./design-reference/email/02-home-email-notification.png
- ./design-reference/email/03-caixa-de-email.png
- ./design-reference/email/04-email-selecionado.png
- ./design-reference/email/05-visualizacao-email.png
- ./design-reference/email/06-email-com-respostas.png

## PASSO 2 — CRIE A BRANCH

git checkout -b feature/email-correcoes-v2

## PASSO 3 — CORREÇÕES OBRIGATÓRIAS

Leia os arquivos atuais antes de editar:
- ./src/components/EmailsModule.tsx
- ./src/pages/EmailPage.tsx (se existir)
- ./src/components/email/ (todos os arquivos)

---

### CORREÇÃO 1 — WIDGET DA HOME (EmailsModule.tsx)

Referência: imagem 01-home-widget.png

O widget na home deve ter EXATAMENTE:

TOPO DO CARD:
- Título "E-mails" com badge contador de não lidos (ex: badge azul "3")
- Botão "Nova Mensagem" (azul, ícone email, canto superior direito)
- Link "Ver todos >" (azul, ao lado do botão)

ABAIXO DO TÍTULO:
- Linha "X não lidos" com ícone de email

CAMPO DE BUSCA:
- Input "Buscar e-mail..." com ícone de lupa à direita
- Largura total do card

SEÇÃO "Caixa de Entrada":
- Label "Caixa de Entrada" + badge com número (ex: 8)
- Dropdown "Recentes" à direita com seta

LISTA DE E-MAILS no widget:
Cada item deve ter:
- Checkbox à esquerda
- Avatar circular com iniciais (cor azul #1890ff)
- Ponto azul de não lido (bullet azul antes do título)
- Título em negrito (não lido) ou normal (lido)
- "De: [Remetente]"
- Preview do texto truncado
- Tags: "Não Lido" (pill azul claro) + "Anexo" (ícone paperclip)
- Hora à direita (ex: Seg. 08:30)
- Ícone estrela (★) ao hover para favoritar
- Ícone "..." ao hover para menu de contexto

SEPARADOR entre e-mails não lidos e lidos:
- Linha fina com ícone estrela (★) — indica início dos favoritos/lidos

AO CLICAR EM UM E-MAIL NO WIDGET:
- Abrir o painel de visualização (igual imagem 02)
- Exibir como um drawer lateral direito OU expandir o card
- Conteúdo: remetente, destinatários, corpo, anexos, botões de ação
- NÃO navegar para outra página — abrir inline ou em drawer

---

### CORREÇÃO 2 — PÁGINA COMPLETA DE E-MAIL (EmailPage.tsx)

Referência: imagens 03, 04, 05, 06

LAYOUT GERAL:
- Sidebar esquerda fixa (130px): Caixa de Entrada, Favoritos, Enviados, Spam, Lixeira
- Área central: lista de e-mails
- Painel direito: leitor de e-mail (abre ao clicar)

TOPO DA PÁGINA:
- Breadcrumb: "Workspace / E-mail"
- Botão "Voltar" (← ícone)
- Campo busca: "Buscar em todos os E-mails" + lupa
- Botão "Escrever novo E-mail" (azul, ícone edit, canto direito)

TABS DE FILTRO:
- Todas (ativa por padrão — fundo azul claro, texto azul)
- Não Lidos (ícone envelope)
- Lidos (ícone envelope aberto)
- Favoritos (ícone estrela)

CABEÇALHO DA LISTA:
- "Caixa de Entrada" + badge contador
- Dropdown "Recentes ▼" à direita

CADA ITEM DA LISTA:
- Checkbox à esquerda
- Avatar azul com inicial
- Ponto azul = não lido
- Título (negrito = não lido, normal = lido)
- "De: [Remetente]"
- Preview truncado
- Tag "Não Lido" (azul) OU "Lido" (cinza)
- Tag "Anexo" (ícone paperclip) quando houver
- Hora à direita
- Estrela ao hover
- "..." ao hover

SELEÇÃO MÚLTIPLA (ao marcar checkboxes):
- Toolbar aparece no topo da lista substituindo o cabeçalho
- Ícones: selecionar todos, favoritar, marcar lido, spam, excluir
- Tooltip "Mover para spam" ao hover no ícone spam

MENU DE CONTEXTO ("..."):
- Adicionar aos Favoritos
- Marcar como Lido
- Marcar como não Lido
- Mover para Spam
- Excluir (vermelho)

---

### CORREÇÃO 3 — PAINEL DE LEITURA (EmailReader)

Referência: imagens 05 e 06

QUANDO UM E-MAIL É CLICADO:
- Lista reduz para ~40% da largura
- Painel de leitura ocupa ~60%
- Transição suave

CONTEÚDO DO PAINEL:
- Título/assunto (18px, negrito)
- Avatar + "Remetente <email@dominio.gov.br>"
- "Destinatários: UGARQUI; Natã Pereira"
- Data/hora à direita: "Hoje às 08:30"
- Ícone estrela (favorito) à direita
- Separador
- Corpo do e-mail (texto corrido)
- Seção "Anexos (2)" com cards PDF:
  - Ícone PDF azul
  - Nome do arquivo
  - Tamanho
  - Botão download (↓)
  - 2 cards lado a lado

BOTÕES DE AÇÃO NO RODAPÉ:
- "← Responder" (azul primário)
- "↰ Responder a todos" (azul primário)
- "→ Encaminhar" (outline cinza)
- "Excluir" (outline vermelho)

---

### CORREÇÃO 4 — THREAD DE RESPOSTAS

Referência: imagem 06

Quando há respostas encadeadas:
- Exibir mensagens empilhadas abaixo do e-mail original
- Cada resposta tem: avatar, nome, email, hora, corpo, anexos

CAMPO DE RESPOSTA INLINE (ao clicar "Responder"):
- "Para: [destinatário]" com dropdown
- Área de texto "Seu texto..."
- Botão "→ Enviar" (azul, canto inferior direito)

---

### CORREÇÃO 5 — PAGINAÇÃO

No rodapé da página de e-mail:
- "10 itens por página" (dropdown)
- "X itens" (total)
- Input de página + "de Y páginas"
- Botões < e >

---

## PASSO 4 — REGRAS DE CORES (NÃO ALTERAR)

Manter exatamente as cores já aplicadas nas imagens de referência:
- Azul primário: #1890ff (botões, avatares, badges, tabs ativas)
- Badge não lido: fundo #e6f4ff, texto #1890ff
- Tag lido: fundo #f5f5f5, texto #8c8c8c
- Ponto não lido: #1890ff
- Estrela favorito: #faad14
- Excluir: #ff4d4f
- Fundo sidebar: #fafafa
- Hover item lista: #f5f5f5
- Item selecionado: #e6f4ff
- Separador: #f0f0f0
- Texto primário: #262626
- Texto secundário: #595959
- Texto terciário: #8c8c8c

NÃO criar cores novas.
NÃO alterar cores existentes.

---

## PASSO 5 — VALIDAÇÃO

Após implementar, confirme:
[ ] Widget home mostra contador de não lidos
[ ] Widget home tem botão "Nova Mensagem"
[ ] Widget home tem busca de e-mail
[ ] Clicar e-mail no widget abre visualização inline/drawer
[ ] Página de e-mail tem sidebar com pastas
[ ] Tabs de filtro funcionam (Todas/Não Lidos/Lidos/Favoritos)
[ ] Checkbox + toolbar de seleção múltipla funciona
[ ] Menu "..." abre com opções corretas
[ ] Painel de leitura abre ao clicar e-mail
[ ] Botões Responder/Responder a todos/Encaminhar/Excluir presentes
[ ] Thread de respostas exibe corretamente
[ ] Campo de resposta inline funciona
[ ] Paginação no rodapé presente
[ ] Nenhuma cor foi alterada

---

## PASSO 6 — COMMIT

git add .
git commit -m "fix: correções módulo e-mail v2 - widget home, leitura, thread e paginação"
git push origin feature/email-correcoes-v2
