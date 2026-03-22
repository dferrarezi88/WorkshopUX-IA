import React, { useState } from 'react';
import { MaterialIcon } from '../MaterialIcon';
import { Email } from '../../types/email';
import { EmailAttachmentCard } from './EmailAttachment';

interface EmailThreadProps {
  messages: Email[];
  onSendReply: (to: string, body: string) => void;
  showReplyField: boolean;
  replyTo: string;
  onCloseReply: () => void;
}

export const EmailThread: React.FC<EmailThreadProps> = ({
  messages,
  onSendReply,
  showReplyField,
  replyTo,
  onCloseReply,
}) => {
  const [replyBody, setReplyBody] = useState('');

  const handleSend = () => {
    if (replyBody.trim()) {
      onSendReply(replyTo, replyBody);
      setReplyBody('');
    }
  };

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <div style={{ borderTop: '1px solid #f0f0f0', margin: '0 -16px', marginBottom: '16px' }} />

          {/* Thread message header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: msg.from.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  flexShrink: 0,
                }}
              >
                {msg.from.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#262626' }}>{msg.from.name}</div>
                <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{msg.from.email}</div>
                <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                  Natã Pereira
                </div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#8c8c8c', flexShrink: 0 }}>
              {msg.date} às {msg.time}
            </div>
          </div>

          {/* Thread message body */}
          <div
            style={{
              fontSize: '14px',
              color: '#262626',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              marginBottom: '16px',
            }}
          >
            {msg.body}
          </div>

          {/* Thread attachments */}
          {msg.hasAttachment && msg.attachments && msg.attachments.length > 0 && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#262626', marginBottom: '10px' }}>
                Anexos ({msg.attachments.length})
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {msg.attachments.map((att) => (
                  <EmailAttachmentCard key={att.id} attachment={att} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Inline reply field */}
      {showReplyField && (
        <div>
          <div style={{ borderTop: '1px solid #f0f0f0', margin: '0 -16px', marginBottom: '16px' }} />
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
              <span style={{ fontSize: '13px', color: '#262626' }}>{replyTo}</span>
              <button
                onClick={onCloseReply}
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
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
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
                onClick={handleSend}
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
  );
};
