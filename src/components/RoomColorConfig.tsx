import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';

interface RoomColorConfigProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Array<{ id: string; name: string; unit: string; capacity: number }>;
  roomColors: Record<string, string>;
  onUpdateRoomColor: (roomId: string, color: string) => void;
}

const PRESET_COLORS = [
  '#EF4444', // Vermelho
  '#F97316', // Laranja
  '#F59E0B', // Âmbar
  '#EAB308', // Amarelo
  '#84CC16', // Lima
  '#22C55E', // Verde
  '#10B981', // Esmeralda
  '#14B8A6', // Turquesa
  '#06B6D4', // Ciano
  '#0EA5E9', // Azul claro
  '#3B82F6', // Azul
  '#6366F1', // Índigo
  '#8B5CF6', // Violeta
  '#A855F7', // Roxo
  '#D946EF', // Fúcsia
  '#EC4899', // Rosa
  '#6B7280', // Cinza
];

export const RoomColorConfig: React.FC<RoomColorConfigProps> = ({
  isOpen,
  onClose,
  rooms,
  roomColors,
  onUpdateRoomColor,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState('#3B82F6');

  if (!isOpen) return null;

  const handleColorSelect = (color: string) => {
    if (selectedRoomId) {
      onUpdateRoomColor(selectedRoomId, color);
    }
  };

  const handleCustomColorApply = () => {
    if (selectedRoomId && customColor) {
      onUpdateRoomColor(selectedRoomId, customColor);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings size={24} className="text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Configurar cores das salas</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">
            Personalize as cores de visualização das salas. As cores configuradas serão aplicadas nos agendamentos relacionados.
          </p>

          {/* Lista de salas */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selecione uma sala:</h3>
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  selectedRoomId === room.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{room.name}</p>
                    <p className="text-sm text-gray-500">{room.unit} - Capacidade: {room.capacity} pessoas</p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: roomColors[room.id] || '#3B82F6' }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Seleção de cor */}
          {selectedRoomId && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Escolha uma cor:</h3>
              
              {/* Cores predefinidas */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-3">Cores predefinidas:</p>
                <div className="grid grid-cols-9 gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Color picker personalizado */}
              <div>
                <p className="text-xs text-gray-500 mb-3">Cor personalizada:</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-20 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#3B82F6"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleCustomColorApply}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Pré-visualização:</p>
                <div
                  className="px-3 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: roomColors[selectedRoomId] || '#3B82F6' }}
                >
                  Agendamento de exemplo
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
