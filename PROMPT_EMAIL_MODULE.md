# PROMPT — MÓDULO DE E-MAIL COMPLETO
# Cole no Claude Code (cursor >)

## CONTEXTO

Estamos adicionando um módulo de E-mail completo ao projeto WorkshopUX-IA.
O módulo já existe parcialmente como widget na home (EmailsModule.tsx).
Agora precisa ser expandido para uma página completa de e-mail com todas as
funcionalidades descritas abaixo.

Execute antes de qualquer mudança:
git checkout -b feature/email-module-completo

---

## PASSO 1 — ANALISE O QUE JÁ EXISTE

Leia os seguintes arquivos do projeto atual:
- ./src/components/EmailsModule.tsx (widget da home)
- ./src/components/Sidebar.tsx (para entender como adicionar rota de e-mail)
- ./src/App.tsx (para entender como adicionar nova página/rota)

---

## PASSO 2 — ESTRUTURA DE ARQUIVOS A CRIAR

Crie os seguintes arquivos novos:

```
src/
  pages/
    EmailPage.tsx              ← página principal do e-mail
  components/email/
    EmailSidebar.tsx           ← sidebar esquerda do e-mail
    EmailList.tsx              ← lista de e-mails com filtros
    EmailReader.tsx            ← painel de leitura do e-mail
    EmailComposer.tsx          ← modal/painel de escrever novo e-mail
    EmailContextMenu.tsx       ← menu de contexto (3 pontinhos)
    EmailToolbar.tsx           ← barra de ações em seleção múltipla
    EmailAttachment.tsx        ← card de anexo PDF
    EmailThread.tsx            ← thread de respostas encadeadas
```

---

## PASSO 3 — INTERFACES TYPESCRIPT

Crie em `src/types/email.ts`:

```typescript
export interface Email {
  id: string;
  subject: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
    color: string;
  };
  to: string[];
  preview: string;
  body: string;
  date: string;
  time: string;
  isRead: boolean;
  isFavorite: boolean;
  hasAttachment: boolean;
  attachments?: EmailAttachment[];
  folder: 'inbox' | 'sent' | 'spam' | 'trash' | 'favorites';
  priority?: 'high' | 'normal';
  thread?: Email[];
}

export interface EmailAttachment {
  id: string;
  name: string;
  type: 'PDF' | 'DOC' | 'XLS' | 'IMG';
  size: string;
}

export interface EmailFolder {
  id: string;
  label: string;
  icon: string;
  count: number;
}
```

---

## PASSO 4 — DADOS MOCK

Crie em `src/data/mockEmails.ts` com ao menos 8 e-mails mockados:

```typescript
// Baseado nas telas do design:
// - Remetente: Diretoria Executiva <airtondasilva@sefaz.ms.gov.br>
// - Assunto: "Comunicado Oficial - Nova Política de Segurança"
// - Preview: "A partir desta semana, todas as estações de trabalho deverão seguir..."
// - Status: Não lido + Anexo
// - Pasta: inbox
// - Prioridade: alta para os 2 primeiros
// - Criar também 1 email lido (id: email-4, isRead: true)
// - Criar 1 favorito (id: email-1, isFavorite: true)
// - Contagem de pastas: inbox=8, favorites=5, sent=0, spam=5, trash=5
// - Corpo completo com Lorem ipsum (igual ao design)
// - 2 anexos PDF em alguns e-mails
// - 1 email com thread de resposta (de Airton da Silva)
```

---

## PASSO 5 — IMPLEMENTAR EmailSidebar.tsx

Layout: sidebar esquerda fixa com 130px de largura.

Itens (com ícone MaterialIcon + label + contador):
- Caixa de Entrada (ícone: inbox, contador: 5, ativo por padrão)
- Favoritos (ícone: star, contador: 5)
- Enviados (ícone: send, sem contador)
- Spam (ícone: report, contador: 5)
- Lixeira (ícone: delete, contador: 5)

Visual:
- Item ativo: fundo azul primário (#1890ff ou equivalente), texto branco
- Item hover: fundo cinza claro
- Padding: 8px 12px por item
- Fonte: 14px, sem negrito
- Contadores: badge pequeno à direita

---

## PASSO 6 — IMPLEMENTAR EmailList.tsx

Estrutura do topo:
- Breadcrumb: "Workspace / E-mail"
- Botão "Voltar" (MaterialIcon: arrow_back)
- Campo de busca: "Buscar em todos os E-mails" + ícone lupa
- Botão primário: "Escrever novo E-mail" (ícone: edit)

Tabs de filtro (abaixo da busca):
- Todas (ativo por padrão, fundo azul claro)
- Não Lidos (ícone: mark_email_unread)
- Lidos (ícone: mark_email_read)
- Favoritos (ícone: star)

Cabeçalho da lista:
- "Caixa de Entrada" + contador (ex: 8)
- Dropdown "Recentes" à direita

Cada item da lista de e-mail:
- Checkbox à esquerda (seleção múltipla)
- Avatar circular com iniciais (cor dinâmica, ex: azul para "D")
- Ponto azul = não lido (some quando lido)
- Título do e-mail (negrito se não lido)
- De: [remetente]
- Preview do corpo (truncado com ...)
- Tags de status: "Não lido" (azul claro) + "Anexo" (ícone paperclip)
- Hora/data à direita
- Estrela (favorito) ao hover
- Ícone "..." para menu de contexto ao hover

Estado de e-mail LIDO:
- Sem ponto azul
- Título sem negrito
- Tag "Lido" (cinza)

Estado FAVORITO:
- Estrela dourada visível sempre

---

## PASSO 7 — IMPLEMENTAR EmailContextMenu.tsx

Menu que aparece ao clicar "..." em um e-mail da lista:

Itens:
1. Adicionar aos Favoritos (ícone: star)
2. Marcar como Lido (ícone: mark_email_read)
3. Marcar como não Lido (ícone: mark_email_unread)
4. Mover para Spam (ícone: report)
5. Excluir (ícone: delete, texto vermelho)

Posicionamento: dropdown que aparece próximo ao clique.
Fechar ao clicar fora.

---

## PASSO 8 — IMPLEMENTAR EmailToolbar.tsx

Aparece SOMENTE quando 1 ou mais e-mails estão selecionados via checkbox.

Substitui o cabeçalho da lista quando há seleção.

Itens da toolbar:
- Checkbox "selecionar todos" com dropdown (▼)
- Ícone: Favoritar (star)
- Ícone: Marcar como lido (mark_email_read)  
- Ícone: Mover para spam (report)
- Ícone: Excluir (delete)
- Tooltip ao hover: "Mover para spam", "Excluir", etc.

---

## PASSO 9 — IMPLEMENTAR EmailReader.tsx

Painel direito que aparece ao clicar em um e-mail.

Layout: ocupa ~60% da largura quando aberto (lista fica em ~40%).

Conteúdo:
- Assunto do e-mail (título grande, 18px)
- Avatar + Nome do remetente + email entre <> 
- Destinatários: "Destinatários: UGARQUI; Natã Pereira"
- Data/hora: "Hoje às 08:30" à direita
- Estrela de favorito à direita (toggle)
- Separador
- Corpo do e-mail (texto corrido, 14px, line-height 1.7)
- Seção "Anexos (2)" se houver:
  - Cards de anexo lado a lado (ver EmailAttachment)
- Separador
- Barra de ações no rodapé:
  - "← Responder" (botão primário azul)
  - "↰ Responder a todos" (botão primário azul)
  - "→ Encaminhar" (botão outline)
  - "Excluir" (botão outline vermelho)

---

## PASSO 10 — IMPLEMENTAR EmailAttachment.tsx

Card de anexo com:
- Ícone PDF (azul)
- "Nome do arquivo" (negrito)
- "tamanho do arquivo" (cinza)
- Ícone de download (↓) à direita

Layout: 2 cards lado a lado com gap de 12px.
Fundo: azul muito claro (#EBF3FD ou similar).
Border-radius: 8px.

---

## PASSO 11 — IMPLEMENTAR EmailThread.tsx

Quando um e-mail tem respostas, exibir as respostas encadeadas abaixo do e-mail original.

Cada mensagem da thread:
- Mesmo layout do EmailReader (avatar, nome, email, hora)
- Corpo da mensagem
- Anexos se houver

Separador visual entre mensagens da thread.

CAMPO DE RESPOSTA INLINE (aparece quando clica "Responder"):
- Campo "Para: [destinatário]" com dropdown
- Área de texto "Seu texto..."
- Botão "→ Enviar" (canto inferior direito, azul)

---

## PASSO 12 — IMPLEMENTAR EmailComposer.tsx

Modal/drawer que abre ao clicar "Escrever novo E-mail".

Campos:
- Para: (input com tags de destinatário)
- Assunto:
- Corpo: (textarea grande)
- Botão "Enviar" (azul, canto inferior direito)

---

## PASSO 13 — IMPLEMENTAR EmailPage.tsx

Layout geral da página:

```
┌─────────────────────────────────────────────────┐
│ Header (já existente, fixo no topo)             │
├──────┬──────────────────────────────────────────┤
│Side  │ Breadcrumb: Workspace / E-mail           │
│bar   ├──────────────┬──────────────────────────-│
│Email │ Lista        │ Painel de Leitura         │
│      │ de E-mails   │ (abre ao clicar email)    │
│      │              │                           │
│      │              │                           │
├──────┴──────────────┴────────────────────────── ┤
│ Rodapé: "10 items por página | X items | pág"   │
└─────────────────────────────────────────────────┘
```

Estados:
- Sem e-mail selecionado: lista ocupa 100% da largura
- Com e-mail selecionado: lista 40% + leitor 60%
- Transição suave entre os estados (CSS transition)

Paginação no rodapé:
- "10 itens por página" (dropdown)
- "X itens total"
- "Página [input] de Y páginas"
- Botões < e >

---

## PASSO 14 — CONECTAR AO APP.TSX E SIDEBAR

1. No Sidebar.tsx, garantir que o item "E-mails" no menu navega para a EmailPage.

2. No App.tsx, adicionar a rota/estado para exibir EmailPage quando
   o usuário clica em E-mails no menu lateral.

3. O botão "Ver todos" no widget EmailsModule.tsx (home) deve
   navegar para a EmailPage.

---

## PASSO 15 — ESTILOS E VISUAL

Seguir exatamente o visual das telas de referência:

CORES:
- Azul primário: #1890ff (botões, tabs ativas, avatares)
- Não lido ponto: #1890ff
- Lido tag: #d9d9d9 (cinza claro)
- Não lido tag: #e6f4ff (azul claro) com texto #1890ff
- Hover linha: #f5f5f5
- Selecionado linha: #e6f4ff
- Favorito: #faad14 (dourado)
- Excluir texto: #ff4d4f (vermelho)
- Fundo da página: #f0f2f5
- Fundo cards: #ffffff
- Fundo anexo: #e6f4ff

TIPOGRAFIA:
- Assunto não lido: 14px, font-weight 500
- Assunto lido: 14px, font-weight 400
- Preview: 13px, color #595959
- Hora: 12px, color #8c8c8c

SEPARADORES:
- border-bottom: 1px solid #f0f0f0

---

## PASSO 16 — FUNCIONALIDADES INTERATIVAS

Implementar todas estas interações:

1. SELEÇÃO:
   - Clicar checkbox seleciona/deseleciona
   - Toolbar aparece ao selecionar ≥1
   - Toolbar some ao desselecionar todos

2. LEITURA:
   - Clicar e-mail → abre painel de leitura
   - Marca automaticamente como lido
   - Ponto azul some, tag muda para "Lido"

3. FAVORITO:
   - Clicar estrela → toggle favorito/não-favorito
   - Estrela dourada = favorito

4. MENU CONTEXTO:
   - Clicar "..." → abre menu
   - Clicar fora → fecha menu
   - Ações atualizam estado do e-mail

5. BUSCA:
   - Filtrar lista em tempo real pelo assunto/remetente

6. TABS:
   - Todas: mostra todos
   - Não Lidos: filtra isRead = false
   - Lidos: filtra isRead = true
   - Favoritos: filtra isFavorite = true

7. RESPONDER:
   - Clicar "Responder" → abre campo inline no rodapé do leitor
   - Campo inline com "Para:", textarea, botão "Enviar"
   - Clicar "Enviar" → adiciona à thread e fecha campo

8. PAGINAÇÃO:
   - Navegar entre páginas (mock, sem backend)

---

## PASSO 17 — COMMIT FINAL

Após tudo funcionando sem erros:

```bash
git add .
git commit -m "feat: módulo de e-mail completo com lista, leitura, busca, filtros e thread"
git push origin feature/email-module-completo
```

---

## REGRAS ABSOLUTAS

NÃO alterar:
- Layout geral do sistema (sidebar principal, header)
- Módulo de agenda
- Sistema de convites
- Toasts existentes
- Qualquer outro componente fora do módulo de e-mail

DEVE funcionar:
- Sem erros no console
- Responsivo dentro do layout existente
- Visual idêntico às telas de referência fornecidas
