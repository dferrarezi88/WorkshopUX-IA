import React, { useEffect, useRef } from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface EmailContextMenuProps {
  emailId: string;
  position: { x: number; y: number };
  onClose: () => void;
  onFavorite: (id: string) => void;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onMoveToSpam: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmailContextMenu: React.FC<EmailContextMenuProps> = ({
  emailId,
  position,
  onClose,
  onFavorite,
  onMarkRead,
  onMarkUnread,
  onMoveToSpam,
  onDelete,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      icon: 'star',
      label: 'Adicionar aos Favoritos',
      color: '#595959',
      action: () => { onFavorite(emailId); onClose(); },
    },
    {
      icon: 'mark_email_read',
      label: 'Marcar como Lido',
      color: '#595959',
      action: () => { onMarkRead(emailId); onClose(); },
    },
    {
      icon: 'mark_email_unread',
      label: 'Marcar como não Lido',
      color: '#595959',
      action: () => { onMarkUnread(emailId); onClose(); },
    },
    {
      icon: 'report',
      label: 'Mover para Spam',
      color: '#595959',
      action: () => { onMoveToSpam(emailId); onClose(); },
    },
    {
      icon: 'delete',
      label: 'Excluir',
      color: '#ff4d4f',
      action: () => { onDelete(emailId); onClose(); },
    },
  ];

  // Adjust position to stay in viewport
  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)',
    zIndex: 1000,
    minWidth: '200px',
    padding: '4px 0',
    border: '1px solid #f0f0f0',
  };

  return (
    <div ref={menuRef} style={menuStyle}>
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={item.action}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 12px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: item.color,
            fontSize: '13px',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
          }}
        >
          <MaterialIcon name={item.icon} size={16} />
          {item.label}
        </button>
      ))}
    </div>
  );
};
