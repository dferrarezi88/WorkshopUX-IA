# PROMPT — SUBSTITUIR ENGRENAGEM POR PALETA DE CORES NO CreateEventModal.tsx
# Alteração cirúrgica e definitiva

## REGRA ABSOLUTA
NÃO alterar nenhum outro componente além de CreateEventModal.tsx.
NÃO alterar lógica de criação de eventos.
NÃO alterar campos existentes do formulário.
Alterar APENAS o que está descrito abaixo.

---

## ARQUIVO — src/components/CreateEventModal.tsx

### PASSO 1 — Remover o import do Settings do lucide-react

Localizar a linha:
```tsx
import { X, Calendar, Clock, MapPin, Users, Droplet, Coffee, FileText, AlertCircle, Link as LinkIcon, Settings } from 'lucide-react';
```

Remover apenas `Settings` da lista, deixando:
```tsx
import { X, Calendar, Clock, MapPin, Users, Droplet, Coffee, FileText, AlertCircle, Link as LinkIcon } from 'lucide-react';
```

---

### PASSO 2 — Adicionar a paleta de cores logo após os imports

Após todas as linhas de import, adicionar:

```typescript
const ROOM_COLORS = [
  { id: 'blue',      hex: '#1890ff', label: 'Azul' },
  { id: 'cyan',      hex: '#13c2c2', label: 'Ciano' },
  { id: 'green',     hex: '#52c41a', label: 'Verde' },
  { id: 'lime',      hex: '#a0d911', label: 'Lima' },
  { id: 'yellow',    hex: '#fadb14', label: 'Amarelo' },
  { id: 'orange',    hex: '#fa8c16', label: 'Laranja' },
  { id: 'purple',    hex: '#722ed1', label: 'Roxo' },
  { id: 'magenta',   hex: '#eb2f96', label: 'Magenta' },
  { id: 'geekblue',  hex: '#2f54eb', label: 'Azul Escuro' },
  { id: 'volcano',   hex: '#fa541c', label: 'Vulcão' },
  { id: 'gold',      hex: '#faad14', label: 'Dourado' },
  { id: 'teal',      hex: '#08979c', label: 'Teal' },
]

const RoomColorPicker: React.FC<{
  selectedColor: string;
  usedColors: string[];
  onChange: (color: string) => void;
}> = ({ selectedColor, usedColors, onChange }) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span className="material-icons" style={{ fontSize: '14px' }}>palette</span>
        Escolha uma cor para esta sala
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', padding: '12px', background: '#fafafa', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
        {ROOM_COLORS.map((color) => {
          const isUsed = usedColors.includes(color.hex);
          const isSelected = selectedColor === color.hex;
          return (
            <button
              key={color.id}
              title={isUsed ? `${color.label} — já em uso` : color.label}
              disabled={isUsed}
              onClick={() => !isUsed && onChange(color.hex)}
              onMouseEnter={() => setHoveredId(color.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: color.hex,
                border: isSelected ? '3px solid #262626' : '2px solid transparent',
                cursor: isUsed ? 'not-allowed' : 'pointer',
                opacity: isUsed ? 0.25 : 1,
                transition: 'all 0.15s ease',
                transform: hoveredId === color.id && !isUsed ? 'scale(1.15)' : 'scale(1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                outline: isSelected ? '2px solid #ffffff' : 'none',
                outlineOffset: '-5px',
              }}
            >
              {isSelected && (
                <span className="material-icons" style={{ fontSize: '14px', color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  check
                </span>
              )}
            </button>
          );
        })}
      </div>
      {selectedColor && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '11px', color: '#595959' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: selectedColor, border: '1px solid rgba(0,0,0,0.1)' }} />
          {ROOM_COLORS.find(c => c.hex === selectedColor)?.label}
        </div>
      )}
      <div style={{ marginTop: '4px', fontSize: '11px', color: '#bfbfbf', display: 'flex', alignItems: 'center', gap: '3px' }}>
        <span className="material-icons" style={{ fontSize: '11px' }}>info</span>
        Cores acinzentadas já estão em uso. Vermelho reservado para o sistema.
      </div>
    </div>
  );
};
```

---

### PASSO 3 — Localizar e substituir o botão da engrenagem

Buscar no JSX do componente por qualquer bloco que contenha `Settings` ou `onOpenRoomColorConfig`. Pode aparecer assim:

```tsx
// QUALQUER UM DESTES BLOCOS — DELETAR COMPLETAMENTE:

<button onClick={onOpenRoomColorConfig} ...>
  <Settings size={...} />
</button>

// OU
<button onClick={onOpenRoomColorConfig} ...>
  <Settings ... />
  ...
</button>

// OU qualquer div/button que contenha <Settings
```

Substituir o bloco deletado por:

```tsx
{formData.room && (
  <RoomColorPicker
    selectedColor={roomColors?.[formData.room] || ''}
    usedColors={Object.entries(roomColors || {})
      .filter(([room]) => room !== formData.room)
      .map(([, color]) => color)
    }
    onChange={(color) => {
      if (onRoomColorChange) {
        onRoomColorChange(formData.room, color);
      }
    }}
  />
)}
```

IMPORTANTE: Se o campo de sala usar variável diferente de `formData.room`,
substituir pelo nome correto (ex: `selectedRoom`, `form.room`, etc.)
Verificar qual variável armazena a sala selecionada no formulário.

---

### PASSO 4 — Verificar props do componente

Verificar se a interface de props do componente já tem `onRoomColorChange` e `roomColors`.
Se não tiver, adicionar:

```typescript
roomColors?: Record<string, string>;
onRoomColorChange?: (room: string, color: string) => void;
```

---

## RESULTADO ESPERADO

```
Campo de sala:
┌─────────────────────────────────────┐
│ Sala 01 ▼                           │  ← select existente
└─────────────────────────────────────┘

🎨 Escolha uma cor para esta sala      ← novo, aparece quando sala selecionada
┌─────────────────────────────────────┐
│  🔵  🩵  🟢  🟡  🟡  🟠          │
│  🟣  💗  🔷  🌋  🟤  🩵          │
└─────────────────────────────────────┘
🔵 Azul
ℹ️ Cores acinzentadas já em uso.
```

- ✅ Engrenagem REMOVIDA
- ✅ Paleta inline abaixo do campo de sala
- ✅ Só aparece quando sala selecionada
- ✅ Cores em uso por outras salas desabilitadas
- ✅ Vermelho não aparece

---

## COMMIT E DEPLOY

```
git add src/components/CreateEventModal.tsx
git commit -m "feat: PBI paleta cores sala inline - remove engrenagem"
git push origin HEAD
vercel --prod --force
```
