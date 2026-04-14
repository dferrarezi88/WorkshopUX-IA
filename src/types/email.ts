export interface Email {
  id: string;
  subject: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
    color: string;
  };
  to: string[];
  preview: string;
  body: string;
  date: string;
  time: string;
  isRead: boolean;
  isFavorite: boolean;
  hasAttachment: boolean;
  attachments?: EmailAttachment[];
  folder: 'inbox' | 'sent' | 'spam' | 'trash' | 'favorites';
  priority?: 'high' | 'normal';
  thread?: Email[];
}

export interface EmailAttachment {
  id: string;
  name: string;
  type: 'PDF' | 'DOC' | 'XLS' | 'IMG';
  size: string;
}

export interface EmailFolder {
  id: string;
  label: string;
  icon: string;
  count: number;
}
