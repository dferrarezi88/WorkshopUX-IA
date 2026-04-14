import React from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface EmailToolbarProps {
  selectedCount: number;
  totalCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onFavoriteSelected: () => void;
  onMarkReadSelected: () => void;
  onMoveToSpamSelected: () => void;
  onDeleteSelected: () => void;
}

export const EmailToolbar: React.FC<EmailToolbarProps> = ({
  selectedCount,
  totalCount,
  allSelected,
  onSelectAll,
  onDeselectAll,
  onFavoriteSelected,
  onMarkReadSelected,
  onMoveToSpamSelected,
  onDeleteSelected,
}) => {
  const iconBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '4px',
    color: '#595959',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '8px 16px',
        backgroundColor: '#e6f4ff',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      {/* Select all checkbox with dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginRight: '8px' }}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={allSelected ? onDeselectAll : onSelectAll}
          style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: '#1890ff' }}
        />
        <button style={{ ...iconBtnStyle, padding: '2px' }}>
          <MaterialIcon name="chevron-down" size={14} />
        </button>
        <span style={{ fontSize: '13px', color: '#595959', marginLeft: '4px' }}>
          {selectedCount} selecionado{selectedCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Separator */}
      <div style={{ width: '1px', height: '20px', backgroundColor: '#d9d9d9', margin: '0 4px' }} />

      {/* Action buttons */}
      <button
        title="Adicionar aos Favoritos"
        onClick={onFavoriteSelected}
        style={iconBtnStyle}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f0f0f0'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
      >
        <MaterialIcon name="star" size={18} />
      </button>

      <button
        title="Marcar como lido"
        onClick={onMarkReadSelected}
        style={iconBtnStyle}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f0f0f0'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
      >
        <MaterialIcon name="mark_email_read" size={18} />
      </button>

      <button
        title="Mover para spam"
        onClick={onMoveToSpamSelected}
        style={iconBtnStyle}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f0f0f0'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
      >
        <MaterialIcon name="report" size={18} />
      </button>

      <button
        title="Excluir"
        onClick={onDeleteSelected}
        style={{ ...iconBtnStyle, color: '#ff4d4f' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fff1f0'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
      >
        <MaterialIcon name="delete" size={18} />
      </button>
    </div>
  );
};
