import React, { useState } from 'react';
import { MaterialIcon } from '../MaterialIcon';
import { Email } from '../../types/email';
import { EmailContextMenu } from './EmailContextMenu';
import { EmailToolbar } from './EmailToolbar';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  selectedEmailIds: string[];
  searchQuery: string;
  activeTab: string;
  selectedFolder: string;
  onSelectEmail: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onSearch: (q: string) => void;
  onTabChange: (tab: string) => void;
  onCompose: () => void;
  onBack: () => void;
  onFavorite: (id: string) => void;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onMoveToSpam: (id: string) => void;
  onDelete: (id: string) => void;
  onFavoriteSelected: () => void;
  onMarkReadSelected: () => void;
  onMoveToSpamSelected: () => void;
  onDeleteSelected: () => void;
}

const FOLDER_LABELS: Record<string, string> = {
  inbox: 'Caixa de Entrada',
  favorites: 'Favoritos',
  sent: 'Enviados',
  spam: 'Spam',
  trash: 'Lixeira',
};

const TABS = [
  { id: 'all', label: 'Todas' },
  { id: 'unread', label: 'Não Lidos', icon: 'mark_email_unread' },
  { id: 'read', label: 'Lidos', icon: 'mark_email_read' },
  { id: 'favorites', label: 'Favoritos', icon: 'star' },
];

interface ContextMenuState {
  emailId: string;
  position: { x: number; y: number };
}

export const EmailList: React.FC<EmailListProps> = ({
  emails,
  selectedEmailId,
  selectedEmailIds,
  searchQuery,
  activeTab,
  selectedFolder,
  onSelectEmail,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onSearch,
  onTabChange,
  onCompose,
  onBack,
  onFavorite,
  onMarkRead,
  onMarkUnread,
  onMoveToSpam,
  onDelete,
  onFavoriteSelected,
  onMarkReadSelected,
  onMoveToSpamSelected,
  onDeleteSelected,
}) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hasSelection = selectedEmailIds.length > 0;
  const allSelected = selectedEmailIds.length === emails.length && emails.length > 0;

  const handleContextMenu = (e: React.MouseEvent, emailId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ emailId, position: { x: e.clientX, y: e.clientY } });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: selectedEmailId ? '0 0 40%' : '1',
        transition: 'flex 0.3s ease',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Top header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', backgroundColor: '#ffffff' }}>
        {/* Breadcrumb + Voltar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '13px',
              color: '#595959',
              cursor: 'pointer',
            }}
          >
            <MaterialIcon name="arrow_back" size={14} />
            Voltar
          </button>
          <span style={{ fontSize: '13px', color: '#8c8c8c' }}>
            Workspace / E-mail
          </span>
        </div>

        {/* Search + Compose */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              padding: '6px 12px',
              backgroundColor: '#fafafa',
            }}
          >
            <MaterialIcon name="search" size={16} className="" />
            <input
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Buscar em todos os E-mails"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '13px',
                color: '#262626',
                flex: 1,
                fontFamily: 'inherit',
              }}
            />
          </div>
          <button
            onClick={onCompose}
            style={{
              backgroundColor: '#1890ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '7px 14px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <MaterialIcon name="edit" size={15} />
            Escrever novo E-mail
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0', marginTop: '10px', borderBottom: '1px solid #E5E7EB' }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                    (e.currentTarget as HTMLElement).style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#6B7280';
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #1D4ED8' : '2px solid transparent',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: isActive ? 500 : 400,
                  backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                  color: isActive ? '#1D4ED8' : '#6B7280',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.icon && <MaterialIcon name={tab.icon} size={14} />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List header or toolbar */}
      {hasSelection ? (
        <EmailToolbar
          selectedCount={selectedEmailIds.length}
          totalCount={emails.length}
          allSelected={allSelected}
          onSelectAll={onSelectAll}
          onDeselectAll={onDeselectAll}
          onFavoriteSelected={onFavoriteSelected}
          onMarkReadSelected={onMarkReadSelected}
          onMoveToSpamSelected={onMoveToSpamSelected}
          onDeleteSelected={onDeleteSelected}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#262626' }}>
              {FOLDER_LABELS[selectedFolder] || 'Caixa de Entrada'}
            </span>
            <span
              style={{
                backgroundColor: '#1890ff',
                color: '#ffffff',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 600,
                padding: '1px 7px',
              }}
            >
              {emails.length}
            </span>
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              color: '#595959',
              cursor: 'pointer',
            }}
          >
            Recentes
            <MaterialIcon name="chevron-down" size={14} />
          </button>
        </div>
      )}

      {/* Email list */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {emails.map((email) => {
          const isSelected = selectedEmailId === email.id;
          const isChecked = selectedEmailIds.includes(email.id);
          const isHovered = hoveredId === email.id;

          let rowBg = '#ffffff';
          if (isSelected) rowBg = '#DBEAFE';
          else if (isChecked) rowBg = '#DBEAFE';
          else if (isHovered) rowBg = '#EFF6FF';

          return (
            <div
              key={email.id}
              onClick={() => onSelectEmail(email.id)}
              onMouseEnter={() => setHoveredId(email.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 16px',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                backgroundColor: rowBg,
                transition: 'background-color 0.15s',
                position: 'relative',
              }}
            >
              {/* Checkbox — visível apenas ao hover ou quando selecionado */}
              <div
                onClick={(e) => { e.stopPropagation(); onToggleSelect(email.id); }}
                style={{ paddingTop: '1px', flexShrink: 0, opacity: isHovered || isChecked ? 1 : 0, transition: 'opacity 0.15s' }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleSelect(email.id)}
                  style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: '#1890ff' }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Avatar + unread dot */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: email.from.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {email.from.initials}
                </div>
                {!email.isRead && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      backgroundColor: '#1890ff',
                      border: '1.5px solid #ffffff',
                    }}
                  />
                )}
              </div>

              {/* Email content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: email.isRead ? 400 : 500,
                      color: '#262626',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {email.subject}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    {/* Favorite star */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onFavorite(email.id); }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: email.isFavorite ? '#faad14' : '#d9d9d9',
                        padding: '2px',
                        display: (isHovered || email.isFavorite) ? 'flex' : 'none',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialIcon name="star" size={15} />
                    </button>
                    <span style={{ fontSize: '12px', color: '#8c8c8c' }}>{email.time}</span>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '2px' }}>
                  De: {email.from.name} &lt;{email.from.email}&gt;
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#595959',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '5px',
                  }}
                >
                  {email.preview}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {!email.isRead ? (
                    <span
                      style={{
                        backgroundColor: '#e6f4ff',
                        color: '#1890ff',
                        fontSize: '11px',
                        padding: '1px 7px',
                        borderRadius: '10px',
                        fontWeight: 500,
                      }}
                    >
                      Não lido
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: '#f0f0f0',
                        color: '#8c8c8c',
                        fontSize: '11px',
                        padding: '1px 7px',
                        borderRadius: '10px',
                      }}
                    >
                      Lido
                    </span>
                  )}
                  {email.hasAttachment && (
                    <span style={{ display: 'flex', alignItems: 'center', color: '#8c8c8c' }}>
                      <MaterialIcon name="attachment" size={14} />
                    </span>
                  )}
                </div>
              </div>

              {/* Three dots menu */}
              {isHovered && (
                <button
                  onClick={(e) => handleContextMenu(e, email.id)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '10px',
                    background: '#ffffff',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    color: '#595959',
                    padding: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <MaterialIcon name="more_vert" size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Context menu */}
      {contextMenu && (
        <EmailContextMenu
          emailId={contextMenu.emailId}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
          onFavorite={onFavorite}
          onMarkRead={onMarkRead}
          onMarkUnread={onMarkUnread}
          onMoveToSpam={onMoveToSpam}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
