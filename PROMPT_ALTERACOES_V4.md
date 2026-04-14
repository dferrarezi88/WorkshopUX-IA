# PROMPT — 3 ALTERAÇÕES PONTUAIS
# Projeto: WorkshopUX-IA — B2B Government Workspace
# Cole no Claude Code ou extensão do VS Code

## REGRA ABSOLUTA
Aplicar SOMENTE as 3 alterações descritas abaixo.
NÃO alterar layout geral, estrutura de componentes, regras de negócio
já implementadas, comportamento de outros perfis ou fluxos existentes.
NÃO criar novos paradigmas visuais.
NÃO redesenhar páginas existentes.

---

## PASSO 1 — BRANCH

git checkout -b feature/alteracoes-pontuais-v1

---

## PASSO 2 — LEIA OS ARQUIVOS ANTES DE EDITAR

Leia obrigatoriamente antes de qualquer alteração:
- ./src/components/Sidebar.tsx
- ./src/components/FavoriteCards.tsx (ou equivalente de atalhos)
- ./src/components/CalendarModule.tsx
- ./src/components/DrawerAgendamentoSecretaria.tsx
- ./src/App.tsx
- ./src/components/CustomizableHome.tsx (ou equivalente da home)
- ./src/components/Header.tsx

---

## ALTERAÇÃO 1 — PERFIL SECRETÁRIA: SOLICITAÇÃO DE ALTERAÇÃO/CANCELAMENTO

### ESCOPO
Atuar exclusivamente na visão do perfil "Secretária".
Não modificar outros perfis, outros fluxos ou regras já existentes.

### ONDE APLICAR
No componente de visualização de reunião existente para o perfil Secretária
(DrawerAgendamentoSecretaria.tsx ou equivalente).

### O QUE ADICIONAR

#### 1.1 — Botão de ação contextual no drawer da reunião

Quando o perfil ativo for "Secretária" E a reunião estiver com status
diferente de "Pendente de edição" E diferente de "Cancelada":

Adicionar botão usando componente de botão já existente no projeto:
- Label: "Solicitar alteração / cancelamento"
- Ícone: MaterialIcon "edit_calendar"
- Estilo: outline/secondary (não primário — ação secundária)
- Posição: dentro do drawer, abaixo das informações da reunião,
  acima dos botões de ação já existentes

#### 1.2 — Modal de solicitação

Ao clicar no botão, abrir modal usando componente de modal já existente com:

TÍTULO: "Solicitar alteração ou cancelamento"

CONTEÚDO:
- Texto informativo: "Você está solicitando ao organizador que realize
  uma alteração ou cancelamento desta reunião."
- Seletor de tipo de solicitação (radio ou select já existente no projeto):
  - "Alteração de data/hora"
  - "Cancelamento da reunião"
- Campo de justificativa obrigatório (textarea já existente):
  - Label: "Justificativa *"
  - Placeholder: "Descreva o motivo da necessidade de liberação desta agenda..."
  - Validação: não permitir envio sem preenchimento
  - Mínimo: 10 caracteres

BOTÕES DO MODAL:
- "Cancelar" (outline) — fecha modal sem ação
- "Enviar solicitação" (primário azul) — confirma e envia

#### 1.3 — Comportamento após envio

Ao confirmar o envio:

1. Atualizar status da reunião para "Pendente de edição"

2. Diferenciação visual da reunião na agenda:
   - Aplicar cor/estado de "pendente" seguindo padrão já existente no projeto
   - Usar o mesmo padrão visual já aplicado para status PENDING
     (overlay diagonal, badge amarelo "Pendente de edição")
   - NÃO criar novo padrão visual

3. Notificações (mock — sem integração real):
   - Exibir toast de sucesso: "Solicitação enviada ao organizador"
   - Usar ToastSystem já existente no projeto

4. Fechar o modal automaticamente após envio

#### 1.4 — Bloqueios obrigatórios

BLOQUEAR o botão de solicitação quando:
- Reunião já estiver com status "Pendente de edição":
  - Exibir mensagem: "Já existe uma solicitação pendente para esta reunião"
  - Botão desabilitado ou oculto
- Reunião já estiver cancelada:
  - Botão não deve aparecer

#### 1.5 — Quando o organizador agir (mock)

Quando o organizador alterar a data/hora:
- Status volta para "ativo" (remover "Pendente de edição")
- Overlay diagonal e badge removidos

Quando o organizador cancelar:
- Reunião some da agenda no slot original

---

## ALTERAÇÃO 2 — RENOMEAR "ATALHOS BROS" PARA "ATALHOS RÁPIDOS"

### ESCOPO
Apenas alterar o texto do título da seção de atalhos rápidos.
NÃO alterar layout, componentes, funcionalidade ou estilo.

### O QUE FAZER

Localizar em todo o projeto (buscar por "Atalhos Bros", "AtalhosBros",
"atalhos-bros", "atalhosBros", "atalhos_bros"):

```
Buscar: "Atalhos Bros"
Substituir por: "Atalhos Rápidos"
```

Verificar nos arquivos:
- ./src/components/FavoriteCards.tsx
- ./src/components/CustomizableHome.tsx
- ./src/components/Sidebar.tsx
- ./src/App.tsx
- Qualquer outro arquivo que contenha "Atalhos Bros"

Substituir APENAS o texto, sem alterar nenhuma outra propriedade.

---

## ALTERAÇÃO 3 — CARDS DE STATUS NO TOPO DA HOME

### ESCOPO
Inserir 4 cards de status imediatamente abaixo do Header na página inicial.
NÃO alterar o Header, Sidebar, nem os cards/módulos já existentes abaixo.

### POSICIONAMENTO
- Logo abaixo do Header (topo do conteúdo principal)
- Acima de qualquer outro conteúdo da home
- Layout: 4 cards em linha (grid de 4 colunas)
- Gap entre cards: 16px
- Padding: mesmo padrão já usado nos cards da home

### ESTRUTURA DE CADA CARD

Cada card deve ter:

TOPO:
- Ícone Material Design (24px, cor do tema)
- Título da seção (14px, font-weight 500)
- Pill/badge com quantidade de itens novos
  (fundo azul #1890ff, texto branco, border-radius pill)

MEIO:
- Número principal grande (28px, font-weight 600)
  representando total de itens
- Subtexto descritivo (12px, cor secundária)

RODAPÉ:
- Separador
- Texto: "Sincronizado às HH:MM" (12px, cor terciária #8c8c8c)
- Ícone de sincronização (MaterialIcon "sync", 12px)

### OS 4 CARDS

**Card 1 — E-mail**
- Ícone: MaterialIcon "mail" (cor #1890ff)
- Título: "E-mails"
- Pill: "X novos" (quantidade de não lidos do mock de e-mails)
- Número principal: total de e-mails na caixa de entrada
- Subtexto: "na caixa de entrada"
- Sincronização: hora atual formatada HH:MM

**Card 2 — Processos**
- Ícone: MaterialIcon "assignment" (cor #52c41a)
- Título: "Processos"
- Pill: "X pendentes" (cor laranja #fa8c16)
- Número principal: total de processos
- Subtexto: "em andamento"
- Sincronização: hora atual formatada HH:MM

**Card 3 — Notícias**
- Ícone: MaterialIcon "newspaper" (cor #722ed1)
- Título: "Notícias"
- Pill: "X novas" (cor verde #52c41a)
- Número principal: total de notícias
- Subtexto: "publicadas hoje"
- Sincronização: hora atual formatada HH:MM

**Card 4 — Calendário/Agenda**
- Ícone: MaterialIcon "calendar_today" (cor #fa8c16)
- Título: "Agenda"
- Pill: "X hoje" (cor azul #1890ff)
- Número principal: total de eventos do dia
- Subtexto: "eventos agendados"
- Sincronização: hora atual formatada HH:MM

### DADOS MOCK

Usar dados estáticos para os números enquanto não há integração real:
```typescript
const statusCards = [
  {
    id: 'email',
    icon: 'mail',
    color: '#1890ff',
    title: 'E-mails',
    total: 8,
    pill: { value: 3, label: 'novos', color: '#1890ff' },
    subtitle: 'na caixa de entrada',
  },
  {
    id: 'processos',
    icon: 'assignment',
    color: '#52c41a',
    title: 'Processos',
    total: 12,
    pill: { value: 4, label: 'pendentes', color: '#fa8c16' },
    subtitle: 'em andamento',
  },
  {
    id: 'noticias',
    icon: 'newspaper',
    color: '#722ed1',
    title: 'Notícias',
    total: 5,
    pill: { value: 2, label: 'novas', color: '#52c41a' },
    subtitle: 'publicadas hoje',
  },
  {
    id: 'agenda',
    icon: 'calendar_today',
    color: '#fa8c16',
    title: 'Agenda',
    total: 3,
    pill: { value: 3, label: 'hoje', color: '#1890ff' },
    subtitle: 'eventos agendados',
  },
]
```

### ESTILO DOS CARDS

Usar o mesmo estilo dos cards já existentes na home:
- background: #ffffff
- border-radius: mesmo já usado nos cards
- box-shadow: mesmo já usado nos cards
- padding: 16px
- border: 1px solid #f0f0f0

Pill/badge:
```css
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}
```

### RESPONSIVIDADE
- Em telas menores que 768px: 2 colunas
- Em telas menores que 480px: 1 coluna

---

## PASSO 3 — VALIDAÇÃO

Confirmar que:

ALTERAÇÃO 1:
[ ] Botão "Solicitar alteração / cancelamento" aparece APENAS no perfil Secretária
[ ] Modal abre com os campos corretos
[ ] Justificativa é obrigatória (não envia sem preencher)
[ ] Após envio: toast de sucesso aparece
[ ] Após envio: reunião fica com status "Pendente de edição" visualmente
[ ] Reunião com "Pendente de edição" bloqueia nova solicitação
[ ] Outros perfis NÃO foram afetados

ALTERAÇÃO 2:
[ ] Texto "Atalhos Bros" foi substituído por "Atalhos Rápidos"
[ ] Nenhum outro estilo ou funcionalidade foi alterado

ALTERAÇÃO 3:
[ ] 4 cards aparecem no topo da home abaixo do header
[ ] Cada card tem ícone, título, pill, número e sincronização
[ ] Layout em 4 colunas no desktop
[ ] Visual consistente com os cards já existentes na home

---

## PASSO 4 — COMMIT FINAL

git add .
git commit -m "feat: solicitação secretária, rename atalhos, cards status home"
git push origin feature/alteracoes-pontuais-v1
