import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MaterialIcon } from './MaterialIcon';
import { Email } from '../types/email';
import { mockEmails } from '../data/mockEmails';
import { EmailAttachmentCard } from './email/EmailAttachment';

interface EmailsModuleProps {
  onNavigateToEmail?: () => void;
}

export const EmailsModule: React.FC<EmailsModuleProps> = ({ onNavigateToEmail }) => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const unreadCount = emails.filter((e) => !e.isRead && e.folder === 'inbox').length;

  const filtered = emails.filter((e) => {
    if (e.folder !== 'inbox') return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.subject.toLowerCase().includes(q) ||
      e.from.name.toLowerCase().includes(q) ||
      e.preview.toLowerCase().includes(q)
    );
  });

  const unreadEmails = filtered.filter((e) => !e.isRead);
  const readEmails = filtered.filter((e) => e.isRead);

  const handleOpenEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
    );
  };

  const handleToggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((em) => (em.id === id ? { ...em, isFavorite: !em.isFavorite } : em))
    );
  };

  const renderEmailRow = (email: Email) => {
    const isHovered = hoveredId === email.id;
    const isChecked = checkedIds.includes(email.id);

    return (
      <div
        key={email.id}
        onClick={() => handleOpenEmail(email)}
        onMouseEnter={() => setHoveredId(email.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          padding: '8px 0',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer',
          backgroundColor: isHovered ? '#f5f5f5' : 'transparent',
          borderRadius: '4px',
          position: 'relative',
          transition: 'background-color 0.15s',
        }}
      >
        {/* Checkbox — visível apenas ao hover */}
        <div
          onClick={(e) => handleToggleCheck(email.id, e)}
          style={{ paddingTop: '2px', flexShrink: 0, opacity: isHovered || isChecked ? 1 : 0, transition: 'opacity 0.15s' }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {}}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '13px', height: '13px', cursor: 'pointer', accentColor: '#1890ff' }}
          />
        </div>

        {/* Avatar + unread dot */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: email.from.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            {email.from.initials}
          </div>
          {!email.isRead && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#1890ff',
                border: '1.5px solid #fff',
              }}
            />
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', marginBottom: '1px' }}>
            <span
              style={{
                fontSize: '13px',
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
              {(isHovered || email.isFavorite) && (
                <button
                  onClick={(e) => handleToggleFavorite(email.id, e)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: email.isFavorite ? '#faad14' : '#d9d9d9',
                    padding: '1px',
                    display: 'flex',
                  }}
                >
                  <MaterialIcon name="star" size={13} />
                </button>
              )}
              {isHovered && (
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8c8c8c',
                    padding: '1px',
                    display: 'flex',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MaterialIcon name="more_vert" size={13} />
                </button>
              )}
              <span style={{ fontSize: '11px', color: '#8c8c8c' }}>Seg. {email.time}</span>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#8c8c8c', marginBottom: '2px' }}>
            De: {email.from.name}
          </div>

          <div
            style={{
              fontSize: '12px',
              color: '#595959',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: '4px',
            }}
          >
            {email.preview}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {!email.isRead ? (
              <span
                style={{
                  backgroundColor: '#e6f4ff',
                  color: '#1890ff',
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 500,
                }}
              >
                Não Lido
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: '#f5f5f5',
                  color: '#8c8c8c',
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                }}
              >
                Lido
              </span>
            )}
            {email.hasAttachment && (
              <span style={{ color: '#8c8c8c', display: 'flex', alignItems: 'center' }}>
                <MaterialIcon name="attachment" size={12} />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#262626' }}>E-mails</span>
              {unreadCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#1890ff',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '10px',
                    padding: '1px 7px',
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={onNavigateToEmail}
                style={{
                  backgroundColor: '#1890ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <MaterialIcon name="email" size={13} />
                Nova Mensagem
              </button>
              <button
                onClick={onNavigateToEmail}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1890ff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                Ver todos
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* X não lidos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
            <MaterialIcon name="email" size={13} />
            <span style={{ fontSize: '12px', color: '#595959' }}>
              {unreadCount} não lido{unreadCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Search */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              padding: '5px 10px',
              backgroundColor: '#fafafa',
              gap: '6px',
            }}
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar e-mail..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '12px',
                color: '#262626',
                fontFamily: 'inherit',
              }}
            />
            <MaterialIcon name="search" size={14} />
          </div>
        </div>

        {/* Lista header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '7px 16px',
            borderBottom: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#262626' }}>Caixa de Entrada</span>
            <span
              style={{
                backgroundColor: '#1890ff',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '10px',
                padding: '1px 6px',
              }}
            >
              {filtered.length}
            </span>
          </div>
          <button
            style={{
              background: 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '5px',
              padding: '3px 8px',
              fontSize: '11px',
              color: '#595959',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            Recentes
            <MaterialIcon name="chevron-down" size={12} />
          </button>
        </div>

        {/* Email list */}
        <div style={{ padding: '0 16px', maxHeight: '380px', overflow: 'auto' }}>
          {/* Unread emails */}
          {unreadEmails.map((email) => renderEmailRow(email))}

          {/* Separator — simple line between unread and read */}
          {unreadEmails.length > 0 && readEmails.length > 0 && (
            <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '2px 0' }} />
          )}

          {/* Read emails */}
          {readEmails.map((email) => renderEmailRow(email))}
        </div>
      </div>

      {/* Inline Email Reader Drawer */}
      {selectedEmail && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setSelectedEmail(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.25)',
              zIndex: 1000,
            }}
          />
          {/* Drawer */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '480px',
              maxWidth: '90vw',
              backgroundColor: '#ffffff',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Drawer header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#262626',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginRight: '12px',
                }}
              >
                {selectedEmail.subject}
              </h3>
              <button
                onClick={() => setSelectedEmail(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#8c8c8c',
                  padding: '4px',
                  display: 'flex',
                  flexShrink: 0,
                }}
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            {/* Drawer body */}
            <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
              {/* Sender info */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: selectedEmail.from.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      flexShrink: 0,
                    }}
                  >
                    {selectedEmail.from.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#262626' }}>
                      {selectedEmail.from.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      {selectedEmail.from.email}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      Natã Pereira
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#8c8c8c', flexShrink: 0 }}>
                  Hoje às {selectedEmail.time}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f0f0f0', marginBottom: '14px' }} />

              {/* Body */}
              <div
                style={{
                  fontSize: '14px',
                  color: '#262626',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '20px',
                }}
              >
                {selectedEmail.body}
              </div>

              {/* Attachments */}
              {selectedEmail.hasAttachment && selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#262626', marginBottom: '8px' }}>
                    Anexos ({selectedEmail.attachments.length})
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {selectedEmail.attachments.map((att) => (
                      <EmailAttachmentCard key={att.id} attachment={att} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer footer actions */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '12px 20px',
                borderTop: '1px solid #f0f0f0',
                flexWrap: 'wrap',
              }}
            >
              {[
                { icon: 'reply', label: 'Responder', primary: true },
                { icon: 'reply', label: 'Responder a todos', primary: true },
                { icon: 'forward', label: 'Encaminhar', primary: false },
                { icon: 'delete', label: 'Excluir', danger: true },
              ].map((btn) => (
                <button
                  key={btn.label}
                  style={{
                    backgroundColor: btn.primary ? '#1890ff' : '#ffffff',
                    color: (btn as any).danger ? '#ff4d4f' : btn.primary ? '#fff' : '#595959',
                    border: btn.primary ? 'none' : `1px solid ${(btn as any).danger ? '#ff4d4f' : '#d9d9d9'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <MaterialIcon name={btn.icon} size={13} />
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
