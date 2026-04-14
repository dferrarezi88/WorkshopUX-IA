import React, { useState } from 'react';
import { MaterialIcon } from '../MaterialIcon';
import { Email } from '../../types/email';
import { EmailAttachmentCard } from './EmailAttachment';
import { EmailThread } from './EmailThread';

interface EmailReaderProps {
  email: Email;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmailReader: React.FC<EmailReaderProps> = ({
  email,
  onClose,
  onToggleFavorite,
  onDelete,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [threadMessages, setThreadMessages] = useState<Email[]>(email.thread || []);

  const handleSendReply = (to: string, body: string) => {
    const newReply: Email = {
      id: `reply-${Date.now()}`,
      subject: email.subject,
      from: {
        name: 'Você',
        email: 'voce@sefaz.ms.gov.br',
        initials: 'V',
        color: '#722ed1',
      },
      to: [to],
      preview: body.slice(0, 80),
      body,
      date: 'Agora',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      isFavorite: false,
      hasAttachment: false,
      folder: 'inbox',
    };
    setThreadMessages((prev) => [...prev, newReply]);
    setShowReply(false);
  };

  const btnPrimary: React.CSSProperties = {
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
  };

  const btnOutline: React.CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#595959',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    padding: '7px 14px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  return (
    <div
      style={{
        flex: '0 0 60%',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Botão fechar (X) */}
      <button
        onClick={onClose}
        title="Fechar"
        style={{
          position: 'absolute',
          top: '12px',
          right: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#8c8c8c',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '4px',
          zIndex: 1,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#262626'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8c8c8c'; }}
      >
        <MaterialIcon name="close" size={20} />
      </button>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {/* Subject */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#262626',
            marginBottom: '16px',
            paddingRight: '32px',
          }}
        >
          {email.subject}
        </div>

        {/* Header: sender + date + favorite */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
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
                flexShrink: 0,
              }}
            >
              {email.from.initials}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: '#262626' }}>
                {email.from.name}
              </div>
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                {email.from.email}
              </div>
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                Destinatários: {email.to.join('; ')}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
              {email.date} às {email.time}
            </span>
            <button
              onClick={() => onToggleFavorite(email.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: email.isFavorite ? '#faad14' : '#d9d9d9',
                padding: '2px',
                display: 'flex',
              }}
            >
              <MaterialIcon name="star" size={20} />
            </button>
          </div>
        </div>

        {/* Separator */}
        <div style={{ borderBottom: '1px solid #f0f0f0', margin: '12px 0' }} />

        {/* Email body */}
        <div
          style={{
            fontSize: '14px',
            color: '#262626',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            marginBottom: '20px',
          }}
        >
          {email.body}
        </div>

        {/* Attachments */}
        {email.hasAttachment && email.attachments && email.attachments.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#262626', marginBottom: '10px' }}>
              Anexos ({email.attachments.length})
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {email.attachments.map((att) => (
                <EmailAttachmentCard key={att.id} attachment={att} />
              ))}
            </div>
          </div>
        )}

        {/* Thread messages */}
        {threadMessages.length > 0 && (
          <EmailThread
            messages={threadMessages}
            onSendReply={handleSendReply}
            showReplyField={showReply}
            replyTo={email.from.name}
            onCloseReply={() => setShowReply(false)}
          />
        )}

        {/* Inline reply field (when no thread) */}
        {showReply && threadMessages.length === 0 && (
          <div>
            <div style={{ borderTop: '1px solid #f0f0f0', margin: '16px 0' }} />
            <div
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderBottom: '1px solid #f0f0f0',
                  backgroundColor: '#fafafa',
                }}
              >
                <span style={{ fontSize: '13px', color: '#8c8c8c', marginRight: '8px' }}>Para:</span>
                <span style={{ fontSize: '13px', color: '#262626' }}>{email.from.name}</span>
                <button
                  onClick={() => setShowReply(false)}
                  style={{
                    marginLeft: 'auto',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8c8c8c',
                    padding: '2px',
                    display: 'flex',
                  }}
                >
                  <MaterialIcon name="close" size={16} />
                </button>
              </div>
              <textarea
                placeholder="Seu texto..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#262626',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '8px 12px',
                  borderTop: '1px solid #f0f0f0',
                  backgroundColor: '#fafafa',
                }}
              >
                <button
                  onClick={() => {
                    handleSendReply(email.from.name, '');
                    setShowReply(false);
                  }}
                  style={{
                    backgroundColor: '#1890ff',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <MaterialIcon name="send" size={14} />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 20px',
          borderTop: '1px solid #f0f0f0',
          backgroundColor: '#ffffff',
          flexWrap: 'wrap',
        }}
      >
        <button style={btnPrimary} onClick={() => setShowReply(true)}>
          <MaterialIcon name="reply" size={15} />
          Responder
        </button>
        <button style={btnPrimary} onClick={() => setShowReply(true)}>
          <MaterialIcon name="reply" size={15} />
          Responder a todos
        </button>
        <button style={btnOutline}>
          <MaterialIcon name="forward" size={15} />
          Encaminhar
        </button>
        <button
          style={{ ...btnOutline, color: '#ff4d4f', borderColor: '#ff4d4f' }}
          onClick={() => onDelete(email.id)}
        >
          <MaterialIcon name="delete" size={15} />
          Excluir
        </button>
      </div>
    </div>
  );
};
