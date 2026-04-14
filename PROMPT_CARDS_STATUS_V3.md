# PROMPT — AJUSTE CARDS DE STATUS DA HOME
# Alteração pontual nos cards de E-mail, Processos, Notícias e Agenda
# Cole no Claude Code ou extensão do VS Code

## REGRA ABSOLUTA
Aplicar SOMENTE as alterações descritas abaixo.
NÃO alterar regras de negócio.
NÃO alterar outros componentes da home.
NÃO alterar Header, Sidebar ou módulos abaixo dos cards.
NÃO alterar font-family Roboto já aplicada.
NÃO alterar Material Icons já aplicados.

---

## PASSO 1 — BRANCH

git checkout -b feature/cards-status-home-v2

---

## PASSO 2 — LEIA OS ARQUIVOS ANTES DE EDITAR

Leia obrigatoriamente:
- ./src/components/CustomizableHome.tsx (ou onde os cards estão)
- ./src/App.css
- ./src/styles/globals.css
- Qualquer arquivo que contenha o componente StatusCards ou similar

---

## ALTERAÇÃO — CARDS DE STATUS DA HOME

### REFERÊNCIA VISUAL (baseada na imagem aprovada)

Layout exato conforme imagem de referência:
- 4 cards em linha horizontal
- Posicionados logo abaixo do header "Atalhos Rápidos"
- Acima do módulo de E-mails
- Grid: 4 colunas iguais com gap de 16px
- Largura total: 100% da área de conteúdo

---

### ESTRUTURA VISUAL DE CADA CARD (Ant Design Card)

Usar componente Card do Ant Design com a seguinte estrutura interna:

```
┌─────────────────────────────────────────┐
│ [ícone 24px]  Título (18px)   [PILL]    │
│                                          │
│  Número grande (32px bold)               │
│  subtexto (13px cinza)                   │
│                                          │
│ ─────────────────────────────────────── │
│ [sync icon 12px] Sincronizado às HH:MM  │
└─────────────────────────────────────────┘
```

---

### ESPECIFICAÇÕES EXATAS DE ESTILO

**Card container (Ant Design Card):**
```tsx
<Card
  style={{
    borderRadius: '8px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    padding: '0',
  }}
  bodyStyle={{ padding: '16px 20px' }}
/>
```

**Linha do topo (ícone + título + pill):**
```css
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 12px;
```

**Ícone Material Design:**
```css
font-size: 24px;
margin-right: 8px;
```

**Título do card:**
```css
font-family: 'Roboto', sans-serif;
font-size: 18px;        /* ALTERAÇÃO: era menor, agora 18px */
font-weight: 500;
color: #262626;
flex: 1;
```

**Pill/Badge de quantidade:**
```css
/* Usar Tag do Ant Design */
border-radius: 10px;
font-size: 12px;
font-weight: 500;
padding: 2px 8px;
color: white;
border: none;
```

**Número principal:**
```css
font-family: 'Roboto', sans-serif;
font-size: 32px;
font-weight: 700;
color: #262626;
line-height: 1.2;
margin-bottom: 4px;
```

**Subtexto:**
```css
font-family: 'Roboto', sans-serif;
font-size: 13px;
color: #8c8c8c;
margin-bottom: 12px;
```

**Separador:**
```css
border-top: 1px solid #f0f0f0;
margin: 8px 0;
```

**Rodapé sincronização:**
```css
display: flex;
align-items: center;
gap: 4px;
font-size: 12px;
color: #bfbfbf;
font-family: 'Roboto', sans-serif;
```

---

### OS 4 CARDS — DADOS E CORES EXATOS

**Card 1 — E-mails**
- Ícone: `<span className="material-icons" style={{color:'#1890ff',fontSize:'24px'}}>mail</span>`
- Título: "E-mails" (18px)
- Pill: "3 novos" — background #1890ff
- Número: 8
- Subtexto: "na caixa de entrada"
- Rodapé: "Sincronizado às [hora atual]"

**Card 2 — Processos**
- Ícone: `<span className="material-icons" style={{color:'#52c41a',fontSize:'24px'}}>assignment</span>`
- Título: "Processos" (18px)
- Pill: "4 pendentes" — background #fa8c16
- Número: 12
- Subtexto: "em andamento"
- Rodapé: "Sincronizado às [hora atual]"

**Card 3 — Notícias**
- Ícone: `<span className="material-icons" style={{color:'#722ed1',fontSize:'24px'}}>newspaper</span>`
- Título: "Notícias" (18px)
- Pill: "2 novas" — background #52c41a
- Número: 5
- Subtexto: "publicadas hoje"
- Rodapé: "Sincronizado às [hora atual]"

**Card 4 — Agenda**
- Ícone: `<span className="material-icons" style={{color:'#fa8c16',fontSize:'24px'}}>calendar_today</span>`
- Título: "Agenda" (18px)
- Pill: "3 hoje" — background #1890ff
- Número: 3
- Subtexto: "eventos agendados"
- Rodapé: "Sincronizado às [hora atual]"

---

### HORA DE SINCRONIZAÇÃO

Usar hora atual do sistema formatada como HH:MM:

```tsx
const syncTime = new Date().toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
})
```

---

### GRID DOS 4 CARDS

```tsx
<Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
  <Col xs={24} sm={12} lg={6}>
    {/* Card E-mails */}
  </Col>
  <Col xs={24} sm={12} lg={6}>
    {/* Card Processos */}
  </Col>
  <Col xs={24} sm={12} lg={6}>
    {/* Card Notícias */}
  </Col>
  <Col xs={24} sm={12} lg={6}>
    {/* Card Agenda */}
  </Col>
</Row>
```

Usar Row e Col do Ant Design para o grid.
Responsivo: 1 coluna no mobile, 2 no tablet, 4 no desktop.

---

### POSICIONAMENTO NA HOME

Os cards devem aparecer:
1. Logo abaixo da seção "Atalhos Rápidos"
2. Imediatamente acima do módulo de E-mails
3. Com margin-bottom: 24px separando dos módulos abaixo

NÃO mover nem alterar nenhum outro elemento da página.

---

### CÓDIGO DE REFERÊNCIA DO COMPONENTE

```tsx
import { Card, Row, Col, Tag } from 'antd'

const syncTime = new Date().toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
})

const statusCards = [
  {
    icon: 'mail',
    iconColor: '#1890ff',
    title: 'E-mails',
    pill: { label: '3 novos', color: '#1890ff' },
    total: 8,
    subtitle: 'na caixa de entrada',
  },
  {
    icon: 'assignment',
    iconColor: '#52c41a',
    title: 'Processos',
    pill: { label: '4 pendentes', color: '#fa8c16' },
    total: 12,
    subtitle: 'em andamento',
  },
  {
    icon: 'newspaper',
    iconColor: '#722ed1',
    title: 'Notícias',
    pill: { label: '2 novas', color: '#52c41a' },
    total: 5,
    subtitle: 'publicadas hoje',
  },
  {
    icon: 'calendar_today',
    iconColor: '#fa8c16',
    title: 'Agenda',
    pill: { label: '3 hoje', color: '#1890ff' },
    total: 3,
    subtitle: 'eventos agendados',
  },
]

// Renderização de cada card:
const StatusCard = ({ card }) => (
  <Card
    style={{
      borderRadius: '8px',
      border: '1px solid #f0f0f0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}
    bodyStyle={{ padding: '16px 20px' }}
  >
    {/* Topo: ícone + título + pill */}
    <div style={{ display:'flex', alignItems:'center', marginBottom:'12px' }}>
      <span
        className="material-icons"
        style={{ color: card.iconColor, fontSize: '24px', marginRight: '8px' }}
      >
        {card.icon}
      </span>
      <span style={{
        fontFamily: "'Roboto', sans-serif",
        fontSize: '18px',
        fontWeight: 500,
        color: '#262626',
        flex: 1,
      }}>
        {card.title}
      </span>
      <Tag style={{
        background: card.pill.color,
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 500,
        padding: '2px 8px',
        margin: 0,
      }}>
        {card.pill.label}
      </Tag>
    </div>

    {/* Número principal */}
    <div style={{
      fontFamily: "'Roboto', sans-serif",
      fontSize: '32px',
      fontWeight: 700,
      color: '#262626',
      lineHeight: '1.2',
      marginBottom: '4px',
    }}>
      {card.total}
    </div>

    {/* Subtexto */}
    <div style={{
      fontFamily: "'Roboto', sans-serif",
      fontSize: '13px',
      color: '#8c8c8c',
      marginBottom: '12px',
    }}>
      {card.subtitle}
    </div>

    {/* Separador */}
    <div style={{ borderTop: '1px solid #f0f0f0', margin: '0 0 8px 0' }} />

    {/* Rodapé sincronização */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      color: '#bfbfbf',
      fontFamily: "'Roboto', sans-serif",
    }}>
      <span className="material-icons" style={{ fontSize: '12px' }}>sync</span>
      Sincronizado às {syncTime}
    </div>
  </Card>
)
```

---

## VALIDAÇÃO FINAL

Confirmar que:
[ ] 4 cards aparecem em linha horizontal abaixo de "Atalhos Rápidos"
[ ] Cada card tem ícone Material Design na cor correta
[ ] Título em 18px Roboto font-weight 500
[ ] Pill colorida com texto branco
[ ] Número grande 32px bold
[ ] Subtexto cinza 13px
[ ] Separador fino antes do rodapé
[ ] Rodapé com ícone sync + "Sincronizado às HH:MM"
[ ] Grid responsivo (4 colunas desktop, 2 tablet, 1 mobile)
[ ] Visual idêntico à imagem de referência aprovada
[ ] Nenhuma regra de negócio foi alterada
[ ] Nenhum outro componente foi modificado

---

## COMMIT FINAL

git add .
git commit -m "feat: cards status home - layout Ant Design, título 18px, Material Icons"
git push origin feature/cards-status-home-v2
