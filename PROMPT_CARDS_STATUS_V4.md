# PROMPT — CARDS DE STATUS DA HOME (VERSÃO CORRIGIDA)
# Cole no Claude Code ou extensão do VS Code

## REGRA ABSOLUTA
Aplicar SOMENTE as alterações descritas abaixo.
NÃO usar Ant Design (antd) — o projeto usa shadcn/ui + Tailwind.
NÃO alterar regras de negócio.
NÃO alterar Header, Sidebar, módulo de e-mails ou qualquer outro componente.
NÃO inserir os cards dentro do componente FavoriteCards ou AtalhoRapidos.
Manter Material Icons já instalados no projeto.
Manter fonte Roboto já aplicada.

---

## PASSO 1 — BRANCH

git checkout -b feature/cards-status-home-v3

---

## PASSO 2 — LEIA ANTES DE EDITAR

Leia obrigatoriamente:
- ./src/components/FavoriteCards.tsx
- ./src/components/CustomizableHome.tsx
- ./src/App.tsx
- ./src/App.css
- ./src/styles/globals.css

Identifique EXATAMENTE onde na home os cards devem ser inseridos:
DEPOIS do componente FavoriteCards/AtalhoRapidos
ANTES do módulo de E-mails
Fora do componente FavoriteCards — são componentes SEPARADOS e INDEPENDENTES

---

## PASSO 3 — CRIAR COMPONENTE StatusCards.tsx

Criar arquivo novo: ./src/components/StatusCards.tsx

### ESTRUTURA DO COMPONENTE

```tsx
import React, { useState } from 'react'
import { MaterialIcon } from './MaterialIcon'

interface StatusCard {
  id: string
  icon: string
  iconColor: string
  iconBg: string
  title: string
  total: number | string
  pill: {
    label: string
    color: string
  }
  subtitle: string
}

const cards: StatusCard[] = [
  {
    id: 'email',
    icon: 'mail',
    iconColor: '#1890ff',
    iconBg: '#e6f4ff',
    title: 'E-mail',
    total: 8,
    pill: { label: '3 novos', color: '#1890ff' },
    subtitle: 'na caixa de entrada',
  },
  {
    id: 'processos',
    icon: 'assignment',
    iconColor: '#52c41a',
    iconBg: '#f6ffed',
    title: 'Processos',
    total: 12,
    pill: { label: '4 pendentes', color: '#fa8c16' },
    subtitle: 'em andamento',
  },
  {
    id: 'noticias',
    icon: 'newspaper',
    iconColor: '#722ed1',
    iconBg: '#f9f0ff',
    title: 'Notícias',
    total: 5,
    pill: { label: '2 novas', color: '#52c41a' },
    subtitle: 'publicadas hoje',
  },
  {
    id: 'agenda',
    icon: 'calendar_today',
    iconColor: '#fa8c16',
    iconBg: '#fff7e6',
    title: 'Agenda',
    total: 3,
    pill: { label: '3 hoje', color: '#1890ff' },
    subtitle: 'eventos agendados',
  },
]

const syncTime = new Date().toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

export const StatusCards: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        margin: '16px 0 24px 0',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: hoveredId === card.id
              ? '1px solid #1890ff'
              : '1px solid #f0f0f0',
            boxShadow: hoveredId === card.id
              ? '0 4px 12px rgba(24,144,255,0.12)'
              : '0 1px 4px rgba(0,0,0,0.06)',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: hoveredId === card.id ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          {/* Topo: ícone + título + pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            {/* Ícone com fundo colorido */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span
                  className="material-icons"
                  style={{ color: card.iconColor, fontSize: '22px' }}
                >
                  {card.icon}
                </span>
              </div>
              {/* Título */}
              <span style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#262626',
              }}>
                {card.title}
              </span>
            </div>

            {/* Pill */}
            <span style={{
              background: card.pill.color,
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: "'Roboto', sans-serif",
              padding: '3px 10px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
            }}>
              {card.pill.label}
            </span>
          </div>

          {/* Número principal */}
          <div style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: '36px',
            fontWeight: 700,
            color: '#262626',
            lineHeight: '1',
            marginBottom: '6px',
          }}>
            {card.total}
          </div>

          {/* Subtexto */}
          <div style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: '13px',
            color: '#8c8c8c',
            marginBottom: '16px',
          }}>
            {card.subtitle}
          </div>

          {/* Separador */}
          <div style={{
            borderTop: '1px solid #f0f0f0',
            marginBottom: '10px',
          }} />

          {/* Rodapé sincronização */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '12px',
            color: '#bfbfbf',
          }}>
            <span className="material-icons" style={{ fontSize: '13px', color: '#bfbfbf' }}>
              sync
            </span>
            Sincronizado às {syncTime}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatusCards
```

---

## PASSO 4 — INSERIR O COMPONENTE NA HOME

Encontre o arquivo que renderiza a home (CustomizableHome.tsx ou App.tsx).

Localize EXATAMENTE onde o FavoriteCards é renderizado.
Insira o StatusCards LOGO APÓS o FavoriteCards e ANTES do módulo de e-mails.

```tsx
// Adicionar import no topo do arquivo:
import { StatusCards } from './StatusCards'

// Inserir na renderização, APÓS FavoriteCards e ANTES de EmailsModule:
<FavoriteCards ... />
<StatusCards />        {/* ← INSERIR AQUI */}
<EmailsModule ... />
```

NÃO inserir dentro do FavoriteCards.
NÃO mover ou alterar o FavoriteCards.
NÃO alterar o EmailsModule.

---

## PASSO 5 — RESPONSIVIDADE

Adicionar media queries para o grid dos cards:

```css
/* Em telas menores que 1024px: 2 colunas */
@media (max-width: 1024px) {
  .status-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Em telas menores que 640px: 1 coluna */
@media (max-width: 640px) {
  .status-cards-grid {
    grid-template-columns: 1fr;
  }
}
```

OU usar estilo inline com CSS Grid responsivo:
```tsx
gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
```

---

## PASSO 6 — REMOVER CÓDIGO ANTIGO COM ERROS

Se existirem imports de "antd" no FavoriteCards.tsx ou em qualquer outro
arquivo que estava causando erros de build, REMOVER esses imports.

Buscar em todo o projeto por:
- `import { Card, Row, Col, Tag } from 'antd'`
- `import { Card } from 'antd'`
- Qualquer import de "antd"

Remover todos esses imports e substituir pela implementação nativa
já descrita neste prompt.

---

## PASSO 7 — VALIDAÇÃO

Confirmar que:
[ ] Build passa sem erros (npm run dev)
[ ] 4 cards aparecem ABAIXO de "Atalhos Rápidos"
[ ] 4 cards aparecem ACIMA do módulo de e-mails
[ ] Cards NÃO estão dentro do componente FavoriteCards
[ ] Cada card tem: ícone colorido com fundo, título 18px, pill, número grande, subtexto, rodapé sync
[ ] Hover: borda azul + sombra suave + leve elevação (translateY -2px)
[ ] Títulos são: "E-mail", "Processos", "Notícias", "Agenda" (sem redundância)
[ ] Ícones Material Icons corretos por card
[ ] Sem imports de "antd" no projeto
[ ] Nenhum outro componente foi alterado

---

## PASSO 8 — COMMIT

git add .
git commit -m "feat: cards status dashboard - abaixo de atalhos, hover, sem antd"
git push origin feature/cards-status-home-v3
