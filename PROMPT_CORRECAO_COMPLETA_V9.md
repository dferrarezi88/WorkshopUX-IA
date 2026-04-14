# PROMPT — CORREÇÃO COMPLETA v9
# 3 problemas para corrigir — executar em ordem

## REGRA ABSOLUTA
NÃO alterar CalendarModule internamente.
NÃO alterar Header, Sidebar ou outros módulos.
NÃO criar novos componentes.
Executar EXATAMENTE como descrito.

---

## BRANCH
git checkout -b feature/correcao-completa-v9

---

## LEIA ESTES ARQUIVOS ANTES DE QUALQUER ALTERAÇÃO
- src/App.tsx
- src/components/StatusCards.tsx
- src/components/CustomizableHome.tsx
- src/components/CalendarModule.tsx
- src/components/DrawerAgendamentoSecretaria.tsx

---

## PROBLEMA 1 — CARDS DUPLICADOS

### CAUSA
O componente <StatusCards /> está sendo renderizado em DOIS lugares:
1. Dentro do CalendarModule.tsx
2. No arquivo pai (CustomizableHome.tsx ou App.tsx)

### SOLUÇÃO

PASSO A — Abrir src/components/CalendarModule.tsx
Localizar e REMOVER:
- Qualquer import de StatusCards no topo do arquivo
- Qualquer chamada <StatusCards /> dentro do JSX
Salvar o arquivo.

PASSO B — Abrir src/components/CustomizableHome.tsx
Verificar se <StatusCards /> aparece apenas UMA VEZ.
Se aparecer mais de uma vez, manter apenas a primeira ocorrência.
Salvar o arquivo.

RESULTADO ESPERADO: Cards aparecem apenas uma vez na página.

---

## PROBLEMA 2 — PILLS COM CORES ERRADAS

### CAUSA
O array de cards no StatusCards.tsx tem cores diferentes nas pills.

### SOLUÇÃO
Abrir src/components/StatusCards.tsx
Substituir o arquivo COMPLETO por este código:

```tsx
import React, { useState } from 'react'

const syncTime = new Date().toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

const cards = [
  {
    id: 'email',
    icon: 'mail',
    title: 'E-mail',
    pill: '3 novos',
    total: 8,
    subtitle: 'na caixa de entrada',
  },
  {
    id: 'processos',
    icon: 'assignment',
    title: 'Processos',
    pill: '4 pendentes',
    total: 12,
    subtitle: 'em andamento',
  },
  {
    id: 'noticias',
    icon: 'newspaper',
    title: 'Notícias',
    pill: '2 novas',
    total: 5,
    subtitle: 'publicadas hoje',
  },
  {
    id: 'agenda',
    icon: 'calendar_today',
    title: 'Agenda',
    pill: '3 hoje',
    total: 3,
    subtitle: 'eventos agendados',
  },
]

export const StatusCards: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      width: '100%',
      marginBottom: '28px',
    }}>
      {cards.map((card) => (
        <div
          key={card.id}
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: hoveredId === card.id
              ? '1px solid #91caff'
              : '1px solid #f0f0f0',
            boxShadow: hoveredId === card.id
              ? '0 4px 12px rgba(24,144,255,0.10)'
              : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: hoveredId === card.id
              ? 'translateY(-2px)'
              : 'translateY(0)',
          }}
        >
          {/* Topo: ícone + título + pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                background: '#e6f4ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span
                  className="material-icons"
                  style={{ color: '#1890ff', fontSize: '20px' }}
                >
                  {card.icon}
                </span>
              </div>
              <span style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#262626',
              }}>
                {card.title}
              </span>
            </div>
            {/* PILL — COR AZUL #1890ff PARA TODOS SEM EXCEÇÃO */}
            <span style={{
              background: '#1890ff',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: "'Roboto', sans-serif",
              padding: '3px 10px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
            }}>
              {card.pill}
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
            <span
              className="material-icons"
              style={{ fontSize: '13px', color: '#bfbfbf' }}
            >
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

## PROBLEMA 3 — PERFIL SECRETÁRIA COM TELA BRANCA

### CAUSA
O merge criou uma declaração duplicada de variáveis no App.tsx,
causando erro de runtime que deixa a tela branca.

### SOLUÇÃO

Abrir src/App.tsx

PASSO A — Buscar por TODAS as ocorrências de:
- `eventStatuses`
- `setEventStatuses`
- `handleSendEditRequest`
- `PENDING_EDIT`

PASSO B — Para cada variável/função encontrada DUPLICADA:
Manter APENAS A ÚLTIMA declaração (a mais completa/recente).
Remover todas as declarações anteriores duplicadas.

PASSO C — Verificar se existe este estado (deve existir APENAS UMA VEZ):
```typescript
const [eventStatuses, setEventStatuses] = useState<Record<string, 
  'PENDING' | 'ACCEPTED' | 'DECLINED' | 'PENDING_EDIT'>>({})
```

PASSO D — Verificar se existe esta função (deve existir APENAS UMA VEZ):
```typescript
const handleSendEditRequest = (eventId: string, requestType: 'edit' | 'cancel') => {
  setEventStatuses(prev => ({ ...prev, [eventId]: 'PENDING_EDIT' }))
  // toast de sucesso
}
```

PASSO E — No DrawerAgendamentoSecretaria.tsx verificar se:
1. O botão "Solicitar alteração ou cancelamento" está presente
2. O modal de solicitação está presente
3. A função handleSendEditRequest está sendo chamada corretamente
4. NÃO há erros de TypeScript no componente

Se encontrar erros, corrigir sem alterar a lógica.

---

## PASSO FINAL — VERIFICAR BUILD

Executar verificação:
```bash
npm run build
```

Se passar sem erros, commitar:
```bash
git add .
git commit -m "fix: cards duplicados removidos, pills azuis, secretaria corrigida"
git push origin feature/correcao-completa-v9
```

Se der erro de TypeScript, corrigir antes de commitar.

---

## RESULTADO ESPERADO

HOME:
```
[E-mail] [Processos] [Notícias] [Agenda]  ← UMA linha apenas
         Todas pills AZUIS #1890ff ✓

[Calendário / Agenda]
  [Visão Colaborador] [Visão Secretaria]
```

PERFIL SECRETÁRIA:
```
Clicar em Visão Secretaria ✓
Clicar em uma reunião ✓
Drawer abre corretamente ✓
Botão "Solicitar alteração ou cancelamento" visível ✓
Modal abre com campo de justificativa ✓
Enviar solicitação → toast + status "Pendente de edição" ✓
```
