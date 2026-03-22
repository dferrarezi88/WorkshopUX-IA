import React from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface EmailSidebarProps {
  selectedFolder: string;
  onSelectFolder: (folder: string) => void;
}

const folders = [
  { id: 'inbox', label: 'Caixa de Entrada', icon: 'inbox', count: 8 },
  { id: 'favorites', label: 'Favoritos', icon: 'star', count: 5 },
  { id: 'sent', label: 'Enviados', icon: 'send', count: 0 },
  { id: 'spam', label: 'Spam', icon: 'report', count: 5 },
  { id: 'trash', label: 'Lixeira', icon: 'delete', count: 5 },
];

export const EmailSidebar: React.FC<EmailSidebarProps> = ({ selectedFolder, onSelectFolder }) => {
  return (
    <div
      style={{
        width: '130px',
        flexShrink: 0,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0',
      }}
    >
      {folders.map((folder) => {
        const isActive = selectedFolder === folder.id;
        return (
          <button
            key={folder.id}
            onClick={() => onSelectFolder(folder.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 8px',
              backgroundColor: isActive ? '#1890ff' : 'transparent',
              color: isActive ? '#ffffff' : '#595959',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              position: 'relative',
              gap: '4px',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <MaterialIcon
                name={folder.icon}
                size={18}
                className={isActive ? '' : ''}
              />
              {folder.count > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: isActive ? '#ffffff' : '#1890ff',
                    color: isActive ? '#1890ff' : '#ffffff',
                    borderRadius: '9px',
                    fontSize: '10px',
                    fontWeight: 600,
                    minWidth: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    lineHeight: '1',
                  }}
                >
                  {folder.count}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? 500 : 400,
                textAlign: 'center',
                lineHeight: '1.3',
              }}
            >
              {folder.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
