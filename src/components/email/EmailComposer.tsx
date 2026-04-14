import React, { useState } from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface EmailComposerProps {
  onClose: () => void;
}

export const EmailComposer: React.FC<EmailComposerProps> = ({ onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    outline: 'none',
    fontSize: '14px',
    color: '#262626',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          width: '560px',
          maxWidth: '90vw',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#262626' }}>
            Escrever novo E-mail
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#8c8c8c',
              padding: '4px',
              display: 'flex',
              borderRadius: '4px',
            }}
          >
            <MaterialIcon name="close" size={20} />
          </button>
        </div>

        {/* Fields */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
            <span style={{ fontSize: '13px', color: '#8c8c8c', width: '60px', flexShrink: 0 }}>Para:</span>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="destinatario@email.com"
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
            <span style={{ fontSize: '13px', color: '#8c8c8c', width: '60px', flexShrink: 0 }}>Assunto:</span>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Assunto do e-mail"
              style={inputStyle}
            />
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escreva sua mensagem aqui..."
            style={{
              width: '100%',
              minHeight: '240px',
              padding: '16px 20px',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: '#262626',
              resize: 'vertical',
              fontFamily: 'inherit',
              lineHeight: '1.6',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px 20px',
            borderTop: '1px solid #f0f0f0',
            gap: '8px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#ffffff',
              color: '#595959',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              padding: '8px 20px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            style={{
              backgroundColor: '#1890ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={onClose}
          >
            <MaterialIcon name="send" size={15} />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
