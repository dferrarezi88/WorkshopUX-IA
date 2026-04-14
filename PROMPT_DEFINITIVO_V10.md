# PROMPT DEFINITIVO — CORREÇÃO TOTAL v10
# ATENÇÃO: Executar CADA PASSO em sequência. Não pular nenhum.

## PASSO 0 — VERIFICAR BRANCH ATUAL
Antes de qualquer coisa, verificar em qual branch estamos:
Mostrar o resultado de: git branch

---

## PASSO 1 — LER OS ARQUIVOS PROBLEMÁTICOS

Ler o conteúdo COMPLETO destes arquivos:
1. src/components/CustomizableHome.tsx
2. src/components/CalendarModule.tsx
3. src/components/StatusCards.tsx
4. src/App.tsx (apenas as primeiras 350 linhas)

---

## PASSO 2 — CORRIGIR CustomizableHome.tsx

PROBLEMA: StatusCards aparece 2 vezes neste arquivo.

AÇÃO: Encontrar TODAS as ocorrências de <StatusCards no JSX deste arquivo.
Contar quantas vezes aparece.
Se aparecer mais de UMA vez, apagar todas as ocorrências EXCETO a que está
posicionada IMEDIATAMENTE ANTES de <CalendarModule.

ESTRUTURA CORRETA que deve existir:
```
<StatusCards />        ← APENAS UMA VEZ, antes do CalendarModule
<CalendarModule .../>  ← CalendarModule logo abaixo
```

---

## PASSO 3 — CORRIGIR CalendarModule.tsx

PROBLEMA: StatusCards pode estar sendo renderizado dentro do CalendarModule.

AÇÃO:
1. Buscar por "StatusCards" dentro de CalendarModule.tsx
2. Se encontrar:
   - Remover a linha de import: import { StatusCards } from ...
   - Remover a tag: <StatusCards />
3. Se não encontrar: pular este passo

---

## PASSO 4 — SUBSTITUIR StatusCards.tsx COMPLETAMENTE

Apagar TODO o conteúdo atual de src/components/StatusCards.tsx
e escrever exatamente este conteúdo:

```tsx
import React, { useState } from 'react'

const cards = [
  { id: 'email', icon: 'mail', title: 'E-mail', pill: '3 novos', total: 8, subtitle: 'na caixa de entrada' },
  { id: 'processos', icon: 'assignment', title: 'Processos', pill: '4 pendentes', total: 12, subtitle: 'em andamento' },
  { id: 'noticias', icon: 'newspaper', title: 'Notícias', pill: '2 novas', total: 5, subtitle: 'publicadas hoje' },
  { id: 'agenda', icon: 'calendar_today', title: 'Agenda', pill: '3 hoje', total: 3, subtitle: 'eventos agendados' },
]

export const StatusCards: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const syncTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%', marginBottom: '28px' }}>
      {cards.map((card) => (
        <div
          key={card.id}
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: hoveredId === card.id ? '1px solid #91caff' : '1px solid #f0f0f0',
            boxShadow: hoveredId === card.id ? '0 4px 12px rgba(24,144,255,0.10)' : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: hoveredId === card.id ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-icons" style={{ color: '#1890ff', fontSize: '20px' }}>{card.icon}</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#262626' }}>{card.title}</span>
            </div>
            <span style={{ background: '#1890ff', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
              {card.pill}
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: '#262626', lineHeight: '1', marginBottom: '6px' }}>{card.total}</div>
          <div style={{ fontSize: '13px', color: '#8c8c8c', marginBottom: '16px' }}>{card.subtitle}</div>
          <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#bfbfbf' }}>
            <span className="material-icons" style={{ fontSize: '13px' }}>sync</span>
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

## PASSO 5 — CORRIGIR App.tsx (tela branca do perfil Secretária)

Ler src/App.tsx e contar quantas vezes aparecem:
- `const [eventStatuses, setEventStatuses]`
- `const handleSendEditRequest`

Se qualquer uma aparecer MAIS DE UMA VEZ:
- Manter apenas a ÚLTIMA declaração de cada uma
- Remover todas as anteriores

A declaração correta que deve existir UMA ÚNICA VEZ:
```typescript
const [eventStatuses, setEventStatuses] = useState<Record<string, 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'PENDING_EDIT'>>({})
```

---

## PASSO 6 — CONFIRMAR RESULTADO VISUAL

Após salvar todos os arquivos, verificar:

1. CustomizableHome.tsx: StatusCards aparece apenas 1 vez ✓
2. CalendarModule.tsx: Sem StatusCards ✓
3. StatusCards.tsx: Todas as pills têm background: '#1890ff' ✓
4. App.tsx: Sem declarações duplicadas ✓

---

## PASSO 7 — COMMIT E PUSH

```
git add src/components/StatusCards.tsx
git add src/components/CustomizableHome.tsx
git add src/components/CalendarModule.tsx
git add src/App.tsx
git commit -m "fix: remove cards duplicados, pills azuis, corrige secretaria"
git push origin HEAD
```

Usar `git push origin HEAD` para garantir push na branch atual.

---

## CHECKLIST FINAL

[ ] Apenas 1 linha de cards na home
[ ] Todas as 4 pills na cor #1890ff (azul)
[ ] Ícones com fundo #e6f4ff
[ ] Calendário abaixo dos cards (separado)
[ ] Perfil Secretária abre sem tela branca
[ ] Drawer da secretária funciona
[ ] Build sem erros
