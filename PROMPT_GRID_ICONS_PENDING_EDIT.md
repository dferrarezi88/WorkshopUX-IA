# PROMPT — GRID + ÍCONES MATERIAL DESIGN + DESTAQUE PENDING_EDIT
# 3 alterações em um único prompt

## REGRA ABSOLUTA
NÃO alterar lógica de estados, eventos ou funcionalidades.
NÃO alterar pills de status já existentes.
NÃO alterar DrawerAgendamentoSecretaria internamente além dos ícones.
Alterar APENAS o que está descrito abaixo.

---

## ALTERAÇÃO 1 — GRID MATERIAL DESIGN (8pt grid)

### src/App.tsx
Localizar a tag <main> e substituir:
```tsx
// DE:
<main className="flex-1 p-6">

// PARA:
<main className="flex-1" style={{
  padding: '24px',
  boxSizing: 'border-box',
}}>
```

### src/components/CustomizableHome.tsx
Localizar o return e substituir:
```tsx
// DE:
return (
  <div className="space-y-6" style={{ width: '100%' }}>
    <StatusCards />
    {visibleModules.map((module) => renderModule(module.id as ModuleId))}
  </div>
);

// PARA:
return (
  <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }}>
    <StatusCards />
    {visibleModules.map((module) => renderModule(module.id as ModuleId))}
  </div>
);
```

---

## ALTERAÇÃO 2 — ÍCONES MATERIAL DESIGN

### src/components/DrawerAgendamentoSecretaria.tsx

Remover o import do lucide-react:
```tsx
// DELETAR esta linha:
import { X, Calendar, Clock, MapPin, Users, Droplet, Coffee, AlertCircle, User, Edit } from 'lucide-react';
```

Substituir cada ícone lucide pelo equivalente material-icons:

| Substituir | Por |
|---|---|
| `<X size={20} />` | `<span className="material-icons" style={{fontSize:'20px'}}>close</span>` |
| `<Calendar size={20} className="text-purple-600" />` | `<span className="material-icons" style={{fontSize:'20px',color:'#7c3aed'}}>calendar_today</span>` |
| `<Clock size={20} className="text-green-600" />` | `<span className="material-icons" style={{fontSize:'20px',color:'#16a34a'}}>schedule</span>` |
| `<MapPin size={20} className="text-orange-600" />` | `<span className="material-icons" style={{fontSize:'20px',color:'#ea580c'}}>place</span>` |
| `<User size={20} className="text-blue-600" />` | `<span className="material-icons" style={{fontSize:'20px',color:'#2563eb'}}>person</span>` |
| `<Users size={20} className="text-indigo-600" />` | `<span className="material-icons" style={{fontSize:'20px',color:'#4f46e5'}}>people</span>` |
| `<Users size={20} className="text-teal-600" />` | `<span className="material-icons" style={{fontSize:'20px',color:'#0d9488'}}>group</span>` |
| `<Droplet size={18} className="text-blue-600" />` | `<span className="material-icons" style={{fontSize:'18px',color:'#2563eb'}}>water_drop</span>` |
| `<Coffee size={18} className="text-amber-600" />` | `<span className="material-icons" style={{fontSize:'18px',color:'#d97706'}}>coffee</span>` |
| `<AlertCircle size={24} className="text-red-600" />` | `<span className="material-icons" style={{fontSize:'24px',color:'#dc2626'}}>error_outline</span>` |
| `<AlertCircle size={20} />` | `<span className="material-icons" style={{fontSize:'20px'}}>error_outline</span>` |
| `<Edit size={20} />` | `<span className="material-icons" style={{fontSize:'20px'}}>edit</span>` |

### src/components/DrawerAgendamentoColaborador.tsx

Fazer o mesmo processo — remover import lucide-react e substituir
todos os ícones pelos equivalentes material-icons usando a tabela acima.

---

## ALTERAÇÃO 3 — DESTAQUE VISUAL PARA PENDING_EDIT (A+C)

### src/components/CalendarModule.tsx

Dentro das funções renderDayView, renderWeekView e renderMonthView,
localizar onde `isPendingEdit` é verificado e adicionar estilos especiais
de destaque no card do evento.

#### Localizar o style atual do card de evento:
```tsx
style={{ backgroundColor: getRoomColor(event.room) }}
```

#### Substituir por um style condicional que aplica A+C quando PENDING_EDIT:
```tsx
style={{
  backgroundColor: isPendingEdit ? '#fff2f0' : getRoomColor(event.room),
  borderLeft: isPendingEdit ? '4px solid #ff4d4f' : 'none',
  boxShadow: isPendingEdit
    ? '0 0 0 2px #ffccc7, 0 2px 8px rgba(255,77,79,0.15)'
    : 'none',
  position: 'relative',
  transition: 'all 0.2s ease',
}}
```

#### Garantir que isPendingEdit está declarado em cada função de renderização:
```typescript
const isPendingEdit = currentStatus === 'PENDING_EDIT';
```

#### Adicionar ícone de alerta flutuante no canto superior esquerdo para PENDING_EDIT:
```tsx
{isPendingEdit && (
  <div style={{
    position: 'absolute',
    top: '4px',
    left: '4px',
    zIndex: 20,
  }}>
    <span className="material-icons" style={{
      fontSize: '14px',
      color: '#ff4d4f',
    }}>
      warning
    </span>
  </div>
)}
```

Isso deve ser adicionado DENTRO do card de evento, ANTES do conteúdo principal.

---

## RESULTADO ESPERADO

### Grid alinhada (Material Design 8pt):
```
←24px→                              ←24px→
      ┌──────┬──────┬──────┬──────┐
      │Email │Proc. │Not.  │Agend.│
      └──────┴──────┴──────┴──────┘
      ↕ 24px
      ┌────────────────────────────┐
      │ Calendário / Agenda        │
      └────────────────────────────┘
```

### Evento PENDING_EDIT na agenda:
```
┌─────────────────────────────────────────┐
▌⚠ Reunião de Planejamento  [Pend.Alt.]   ▌ ← borda esq. vermelha 4px
▌  08:00 - 09:00 • Sala 01               ▌ ← fundo #fff2f0
▌  5 participantes                        ▌ ← sombra #ffccc7
└─────────────────────────────────────────┘

Versus evento normal:
┌─────────────────────────────────────────┐
│  Daily de Projeto                       │ ← fundo cor da sala
│  09:30 - 10:30 • Sala 02               │
└─────────────────────────────────────────┘
```

### Comportamento com múltiplos eventos no mesmo horário:
```
10:00 │[⚠ Pend.Alt. - Sala 01][Normal - Sala 02][Normal - Sala 03]│
      │ fundo vermelho claro  │ fundo azul       │ fundo amarelo   │
```

O evento PENDING_EDIT se destaca visualmente mesmo lado a lado
com outros eventos normais. ✓

---

## COMMIT E DEPLOY

```
git add src/App.tsx
git add src/components/CustomizableHome.tsx
git add src/components/DrawerAgendamentoSecretaria.tsx
git add src/components/DrawerAgendamentoColaborador.tsx
git add src/components/CalendarModule.tsx
git commit -m "feat: grid 8pt + icons material design + destaque PENDING_EDIT"
git push origin HEAD
vercel --prod
```
