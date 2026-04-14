import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon'; // CORREÇÃO 1: Material Design icons

export interface FavoriteItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  order: number;
}

interface FavoriteCardsProps {
  items: FavoriteItem[];
  onRemove: (key: string) => void;
  onReorder: (items: FavoriteItem[]) => void;
}

// CORREÇÃO 1: Ícones Material Design
const getIconByKey = (key: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    '1': <MaterialIcon name="home" size={18} />,
    '2': <MaterialIcon name="dashboard" size={18} />,
    '3': <MaterialIcon name="dashboard" size={18} />,
    '4': <MaterialIcon name="description" size={18} />,
    '5': <MaterialIcon name="article" size={18} />,
    '6': <MaterialIcon name="folder" size={18} />,
    '7': <MaterialIcon name="folder" size={18} />,
    '8': <MaterialIcon name="link" size={18} />,
    '9': <MaterialIcon name="person" size={18} />,
    '10': <MaterialIcon name="calendar" size={18} />,
    '11': <MaterialIcon name="description" size={18} />,
    '12': <MaterialIcon name="person" size={18} />,
    '13': <MaterialIcon name="calendar" size={18} />,
    '14': <MaterialIcon name="settings" size={18} />,
  };
  return iconMap[key] || <Home size={18} />;
};

export const FavoriteCards: React.FC<FavoriteCardsProps> = ({ items, onRemove, onReorder }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  if (items.length === 0) {
    return null;
  }

  const handleDragStart = (e: React.DragEvent, key: string) => {
    setDraggedItem(key);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    if (draggedItem !== key) {
      setDragOverItem(key);
    }
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropKey: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === dropKey) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = items.findIndex(item => item.key === draggedItem);
    const dropIndex = items.findIndex(item => item.key === dropKey);

    if (draggedIndex === -1 || dropIndex === -1) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, removed);

    // Update order
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index
    }));

    onReorder(reorderedItems);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Atalhos Rápidos</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
          aria-label={isExpanded ? 'Recolher favoritos' : 'Expandir favoritos'}
        >
          {isExpanded ? <MaterialIcon name="expand-less" size={20} /> : <MaterialIcon name="expand-more" size={20} />}
        </button>
      </div>

      {/* Cards */}
      {isExpanded && (
        <div className="px-6 py-5 overflow-x-auto">
            <div className="flex items-start gap-4" style={{ minWidth: 'max-content' }}>
              {items
                .sort((a, b) => a.order - b.order)
                .map(item => {
                const isDragging = draggedItem === item.key;
                const isDragOver = dragOverItem === item.key;

                return (
                  <div
                    key={item.key}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.key)}
                    onDragOver={(e) => handleDragOver(e, item.key)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item.key)}
                    onDragEnd={handleDragEnd}
                    className={`group relative flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all cursor-move ${
                      isDragging ? 'opacity-50 scale-95' : ''
                    } ${
                      isDragOver ? 'shadow-lg scale-105' : 'hover:shadow-md'
                    }`}
                    style={{ 
                      width: '120px', 
                      height: '120px',
                      backgroundColor: '#C1D1FF',
                      borderColor: '#9BB8FF'
                    }}
                  >
                    {/* Drag Handle - CORREÇÃO 1: Material Icon */}
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MaterialIcon name="menu" size={16} className="text-gray-600" />
                    </div>
                    
                    {/* Icon */}
                    <div className="text-gray-700 flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center">
                      {getIconByKey(item.key)}
                    </div>
                    
                    {/* Label */}
                    <span className="text-sm font-medium text-gray-700 text-center leading-tight px-1 break-words max-w-full">
                      {item.label}
                    </span>
                    
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove(item.key);
                      }}
                      onDragStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute -top-2 -right-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white rounded-full shadow-md border border-gray-200 z-10"
                      aria-label="Remover dos favoritos"
                      tabIndex={0}
                    >
                      <MaterialIcon
                        name="close"
                        size={14}
                        className="text-gray-600 hover:text-red-500"
                      />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
