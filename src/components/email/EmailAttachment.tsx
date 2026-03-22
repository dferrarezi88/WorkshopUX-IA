import React from 'react';
import { MaterialIcon } from '../MaterialIcon';
import { EmailAttachment as EmailAttachmentType } from '../../types/email';

interface EmailAttachmentProps {
  attachment: EmailAttachmentType;
}

export const EmailAttachmentCard: React.FC<EmailAttachmentProps> = ({ attachment }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#e6f4ff',
        borderRadius: '8px',
        padding: '10px 14px',
        flex: '1',
        minWidth: '0',
      }}
    >
      <div style={{ color: '#1890ff', flexShrink: 0 }}>
        <MaterialIcon name="picture_as_pdf" size={24} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#262626',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {attachment.name}
        </div>
        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{attachment.size}</div>
      </div>
      <button
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#1890ff',
          padding: '4px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
        title="Download"
      >
        <MaterialIcon name="download" size={18} />
      </button>
    </div>
  );
};
