import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Globe, 
  Users, 
  Settings, 
  Star,
  Table,
  FileSearch,
  TrendingUp,
  Shield,
  Calendar,
  User,
  ShieldCheck,
  Video,
  GripVertical
} from 'lucide-react';

export interface LinkCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  category: string;
  order: number;
  isFavorite: boolean;
  url: string;
  isExternal?: boolean;
}

interface LinkCardsProps {
  onClose?: () => void;
}

export const LinkCards: React.FC<LinkCardsProps> = () => {
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [dragOverCard, setDragOverCard] = useState<string | null>(null);
  
  const initialCards: LinkCard[] = [
    { id: '1', title: 'Tableau', icon: <Table size={18} />, category: 'Relatórios', order: 0, isFavorite: true, url: 'https://tableau.com', isExternal: true },
    { id: '2', title: 'Report Services', icon: <FileSearch size={18} />, category: 'Relatórios', order: 1, isFavorite: false, url: 'https://reportservices.com', isExternal: true },
    { id: '3', title: 'MicroStrategy', icon: <TrendingUp size={18} />, category: 'Relatórios', order: 2, isFavorite: false, url: 'https://microstrategy.com', isExternal: true },
    { id: '4', title: 'Portal Único', icon: <Globe size={18} />, category: 'Documentos', order: 3, isFavorite: true, url: '/portal', isExternal: false },
    { id: '5', title: 'Intranet', icon: <Shield size={18} />, category: 'Documentos', order: 4, isFavorite: false, url: '/intranet', isExternal: false },
    { id: '6', title: 'Portais Externos', icon: <Globe size={18} />, category: 'Links Úteis', order: 5, isFavorite: false, url: 'https://portais.gov.br', isExternal: true },
    { id: '7', title: 'Azure AD', icon: <ShieldCheck size={18} />, category: 'Colaboradores', order: 6, isFavorite: false, url: 'https://portal.azure.com', isExternal: true },
    { id: '8', title: 'Férias', icon: <Calendar size={18} />, category: 'Colaboradores', order: 7, isFavorite: false, url: '/ferias', isExternal: false },
    { id: '9', title: 'Políticas', icon: <FileText size={18} />, category: 'Colaboradores', order: 8, isFavorite: false, url: '/politicas', isExternal: false },
    { id: '10', title: 'Consulta', icon: <User size={18} />, category: 'Colaboradores', order: 9, isFavorite: false, url: '/consulta', isExternal: false },
    { id: '11', title: 'Meet', icon: <Video size={18} />, category: 'Colaboradores', order: 10, isFavorite: true, url: 'https://meet.google.com', isExternal: true },
    { id: '12', title: 'Configurações', icon: <Settings size={18} />, category: 'Sistema', order: 11, isFavorite: false, url: '/configuracoes', isExternal: false },
  ];

  const [cards, setCards] = useState<LinkCard[]>(() => {
    const saved = localStorage.getItem('workspace_link_cards');
    return saved ? JSON.parse(saved) : initialCards;
  });

  const toggleFavorite = (id: string) => {
    const newCards = cards.map(card =>
      card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setCards(newCards);
    localStorage.setItem('workspace_link_cards', JSON.stringify(newCards));
  };

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, cardId: string) => {
    e.preventDefault();
    if (draggedCard && draggedCard !== cardId) {
      setDragOverCard(cardId);
    }
  };

  const handleDragLeave = () => {
    setDragOverCard(null);
  };

  const handleDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    
    if (!draggedCard || draggedCard === targetCardId) {
      setDraggedCard(null);
      setDragOverCard(null);
      return;
    }

    const draggedIndex = cards.findIndex(c => c.id === draggedCard);
    const targetIndex = cards.findIndex(c => c.id === targetCardId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newCards = [...cards];
    const draggedItem = newCards[draggedIndex];
    const targetItem = newCards[targetIndex];

    // Swap orders
    const tempOrder = draggedItem.order;
    draggedItem.order = targetItem.order;
    targetItem.order = tempOrder;

    newCards.sort((a, b) => a.order - b.order);
    setCards(newCards);
    localStorage.setItem('workspace_link_cards', JSON.stringify(newCards));
    
    setDraggedCard(null);
    setDragOverCard(null);
  };

  const sortedCards = [...cards].sort((a, b) => a.order - b.order);
  const favoriteCards = sortedCards.filter(c => c.isFavorite);
  const regularCards = sortedCards.filter(c => !c.isFavorite);

  const renderCard = (card: LinkCard) => {
    const isDragging = draggedCard === card.id;
    const isDragOver = dragOverCard === card.id;

    return (
      <a
        key={card.id}
        href={card.url}
        target={card.isExternal ? '_blank' : '_self'}
        rel={card.isExternal ? 'noopener noreferrer' : undefined}
        draggable
        onDragStart={(e) => handleDragStart(e, card.id)}
        onDragOver={(e) => handleDragOver(e, card.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, card.id)}
        onDragEnd={() => {
          setDraggedCard(null);
          setDragOverCard(null);
        }}
        className={`group relative inline-flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-full hover:border-blue-400 hover:shadow-md hover:bg-blue-50/30 transition-all no-underline ${
          isDragging ? 'opacity-50 scale-95 cursor-move' : 'cursor-pointer'
        } ${
          isDragOver ? 'border-blue-500 shadow-lg scale-105' : ''
        }`}
        style={{ height: '60px', minWidth: 'fit-content' }}
        aria-label={`Acessar ${card.title}`}
      >
        {/* Drag Handle */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
          <GripVertical size={16} className="text-gray-400" />
        </div>
        
        {/* Icon + Label */}
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-6">
          <div className="text-gray-600 flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center">
            {card.icon}
          </div>
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {card.title}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(card.id);
          }}
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white rounded-full z-10"
          aria-label={card.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          tabIndex={0}
        >
          <Star 
            size={16} 
            className={card.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-500'}
          />
        </button>
      </a>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6">
      {/* Título da seção */}
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Links úteis</h3>
      
      {/* Favoritos */}
      {favoriteCards.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Favoritos</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {favoriteCards.map(renderCard)}
          </div>
        </div>
      )}
      
      {/* Todos os links */}
      <div>
        {regularCards.length > 0 && favoriteCards.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Todos os links</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2.5">
          {regularCards.map(renderCard)}
        </div>
      </div>
    </div>
  );
};
