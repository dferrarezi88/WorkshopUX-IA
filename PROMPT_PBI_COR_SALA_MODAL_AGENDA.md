# PROMPT — PBI: SELEÇÃO DE COR DA SALA NO MODAL DE CRIAR AGENDA
# Substituir o ícone de engrenagem por paleta de 12 cores + remover cards duplicados

## CONTEXTO EXATO DA ALTERAÇÃO
Dentro do modal de criar nova agenda (ModalCriarAgenda.tsx ou CreateEventModal.tsx),
existe um campo de seleção de sala. Acima desse campo há um ícone de engrenagem (⚙️)
que abre o RoomColorConfig para configurar cores.

Este prompt substitui esse comportamento da engrenagem por uma paleta de 12 cores
exibida diretamente inline abaixo do campo de seleção de sala, dentro do próprio modal.

## REGRA ABSOLUTA
NÃO alterar CalendarModule.tsx.
NÃO alterar DrawerAgendamentoSecretaria.tsx.
NÃO alterar StatusCards.tsx.
NÃO alterar a lógica de criação de eventos.
Alterar APENAS o que está descrito abaixo.

---

## CORREÇÃO 1 — REMOVER FILEIRA DE CARDS DUPLICADA

### src/App.tsx
Buscar qualquer renderização de <StatusCards /> ou import de StatusCards
FORA do CustomizableHome. Se existir, DELETAR.

### src/components/CustomizableHome.tsx
Garantir que <StatusCards /> aparece EXATAMENTE UMA VEZ no return:

```tsx
return (
  <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }}>
    <StatusCards />   {/* ← APENAS AQUI */}
    {visibleModules.map((module) => renderModule(module.id as ModuleId))}
    {visibleModules.length === 0 && (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500">
          Nenhum módulo ativo. Use o botão "Personalizar Home" para adicionar módulos.
        </p>
      </div>
    )}
  </div>
);
```

---

## CORREÇÃO 2 — PBI: PALETA DE CORES NO MODAL DE CRIAR AGENDA

### ARQUIVO — src/components/ModalCriarAgenda.tsx
### (pode ser CreateEventModal.tsx — verificar qual existe no projeto)

#### PASSO 1 — Adicionar a paleta de cores no topo do arquivo

Logo após os imports, adicionar:

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
  // VERMELHO NÃO INCLUÍDO — reservado para secretária
]
```

#### PASSO 2 — Adicionar o componente ColorPicker antes do componente principal

```tsx
const RoomColorPicker: React.FC<{
  selectedColor: string;
  usedColors: string[];
  onChange: (color: string) => void;
}> = ({ selectedColor, usedColors, onChange }) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{
        fontSize: '12px',
        color: '#8c8c8c',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        <span className="material-icons" style={{ fontSize: '14px' }}>palette</span>
        Escolha uma cor para esta sala
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '8px',
        padding: '12px',
        background: '#fafafa',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
      }}>
        {ROOM_COLORS.map((color) => {
          const isUsed = usedColors.includes(color.hex);
          const isSelected = selectedColor === color.hex;
          const isHovered = hoveredId === color.id;
          return (
            <button
              key={color.id}
              title={isUsed ? `${color.label} — já em uso nesta unidade` : color.label}
              disabled={isUsed}
              onClick={() => !isUsed && onChange(color.hex)}
              onMouseEnter={() => setHoveredId(color.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: color.hex,
                border: isSelected
                  ? '3px solid #262626'
                  : '2px solid transparent',
                cursor: isUsed ? 'not-allowed' : 'pointer',
                opacity: isUsed ? 0.25 : 1,
                transition: 'all 0.15s ease',
                transform: isHovered && !isUsed ? 'scale(1.15)' : 'scale(1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: isSelected ? '2px solid #ffffff' : 'none',
                outlineOffset: '-5px',
              }}
            >
              {isSelected && (
                <span className="material-icons" style={{
                  fontSize: '14px',
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                }}>
                  check
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedColor && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '6px',
          fontSize: '11px',
          color: '#595959',
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: selectedColor,
            border: '1px solid rgba(0,0,0,0.1)',
          }} />
          {ROOM_COLORS.find(c => c.hex === selectedColor)?.label}
        </div>
      )}

      <div style={{
        marginTop: '4px',
        fontSize: '11px',
        color: '#bfbfbf',
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
      }}>
        <span className="material-icons" style={{ fontSize: '11px' }}>info</span>
        Cores acinzentadas já estão em uso. Vermelho reservado para o sistema.
      </div>
    </div>
  );
};
```

#### PASSO 3 — Substituir a engrenagem pelo RoomColorPicker

Localizar no JSX do modal o bloco que contém o ícone de engrenagem.
Pode aparecer como:

```tsx
// DELETAR este bloco (ou equivalente):
<button onClick={onOpenRoomColorConfig}>
  <span className="material-icons">settings</span>
</button>

// OU
<button onClick={onOpenRoomColorConfig}>
  ⚙️
</button>

// OU qualquer variação com "settings" ou "engrenagem"
```

Substituir por:

```tsx
{selectedRoom && (
  <RoomColorPicker
    selectedColor={roomColors[selectedRoom] || ''}
    usedColors={Object.entries(roomColors)
      .filter(([room]) => room !== selectedRoom)
      .map(([, color]) => color)
    }
    onChange={(color) => {
      if (onRoomColorChange) {
        onRoomColorChange(selectedRoom, color);
      }
    }}
  />
)}
```

O `RoomColorPicker` só aparece quando uma sala está selecionada no campo acima.

#### PASSO 4 — Garantir que a prop onRoomColorChange existe

Verificar se o modal já recebe `onRoomColorChange` como prop.
Se não existir, adicionar na interface de props:

```typescript
onRoomColorChange?: (room: string, color: string) => void;
```

#### PASSO 5 — Validação ao salvar

Localizar a função de salvar evento e adicionar:

```typescript
// Se uma sala foi selecionada mas não tem cor definida, avisar
if (selectedRoom && !roomColors[selectedRoom]) {
  setError('Selecione uma cor para a sala antes de confirmar.');
  return;
}
```

---

## RESULTADO ESPERADO

### Modal de criar agenda — campo de sala:

```
┌─────────────────────────────────────────────────────────┐
│ Sala *                                                   │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Sala 01 ▼                                           │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ 🎨 Escolha uma cor para esta sala                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │  🔵  🩵  🟢  🟡  🟡  🟠                          │ │
│ │  🟣  💗  🔷  🌋  🟤  🩵                          │ │
│ └─────────────────────────────────────────────────────┘ │
│ 🔵 Azul                                                  │
│ ℹ️  Cores acinzentadas já em uso. Vermelho reservado.    │
└─────────────────────────────────────────────────────────┘
```

A engrenagem (⚙️) é REMOVIDA.
O seletor de cores aparece INLINE logo abaixo do campo de sala.
Só aparece quando uma sala está selecionada.

---

## COMMIT E DEPLOY

```
git add src/App.tsx
git add src/components/CustomizableHome.tsx
git add src/components/ModalCriarAgenda.tsx
git commit -m "fix: cards duplicados + feat: PBI paleta cores inline modal agenda"
git push origin HEAD
vercel --prod --force
```
