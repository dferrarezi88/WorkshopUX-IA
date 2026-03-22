import { Email } from '../types/email';

const bodyText = `Lorem ipsum dolor sit amet consectetur.

Volutpat mauris blandit ornare fermentum in lectus aliquet dui. Turpis ultrices felis quam pharetra orci diam purus vitae tempus. Diam dictumst egestas enim id. Dis est quam et mauris. Nec orci a elit consequat id in dignissim consequat rutrum. Justo dignissim in potenti in posuere egestas. Facilisis interdum ultrices leo lacus purus.

At egestas turpis facilisis tempus integer. Lorem ipsum eget lorem ornare mauris. A ut sodales scelerisque eu neque eget aliquam. Quis feugiat gravida sem cursus et id nulla.

El egestas performance senean conditus accumsan sed ipsum. Purus faucibus aliquet nec nunc amet faucibus felis.

Volutpat mauris blandit ornare fermentum in lectus aliquet dui. Turpis ultrices felis quam pharetra orci diam purus vitae tempus. Diam dictumst egestas enim id. Dis est quam et mauris. Nec orci a elit consequat id in dignissim consequat rutrum. Justo dignissim in potenti in posuere egestas. Facilisis interdum ultrices leo lacus purus.

At egestas turpis facilisis tempus integer. Lorem ipsum eget lorem ornare mauris. A ut sodales scelerisque eu neque eget aliquam. Quis feugiat gravida sem cursus et id nulla.

El egestas performance senean conditus accumsan sed ipsum. Purus faucibus aliquet nec nunc amet faucibus felis.`;

export const mockEmails: Email[] = [
  {
    id: 'email-1',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI', 'Natã Pereira'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Hoje',
    time: '08:30',
    isRead: false,
    isFavorite: true,
    hasAttachment: true,
    attachments: [
      { id: 'att-1', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
      { id: 'att-2', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
    priority: 'high',
    thread: [
      {
        id: 'email-1-reply-1',
        subject: 'Comunicado Oficial - Nova Política de Segurança',
        from: {
          name: 'Airton da Silva',
          email: 'airtondasilva@sefaz.ms.gov.br',
          initials: 'A',
          color: '#52c41a',
        },
        to: ['UGARQUI'],
        preview: 'Lorem ipsum dolor sit amet consectetur.',
        body: `Lorem ipsum dolor sit amet consectetur.\n\nVolutpat mauris blandit ornare fermentum in lectus aliquet dui. Turpis ultrices felis quam pharetra orci diam purus vitae tempus. Diam dictumst egestas enim id. Dis est quam et mauris.\n\nAt egestas turpis facilisis tempus integer. Lorem ipsum eget lorem ornare mauris. A ut sodales scelerisque eu neque eget aliquam.\n\nEl egestas performance senean conditus accumsan sed ipsum. Purus faucibus aliquet nec nunc amet faucibus felis.`,
        date: 'Hoje',
        time: '09:45',
        isRead: true,
        isFavorite: false,
        hasAttachment: true,
        attachments: [
          { id: 'att-3', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
          { id: 'att-4', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
        ],
        folder: 'inbox',
      },
    ],
  },
  {
    id: 'email-2',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Hoje',
    time: '08:30',
    isRead: false,
    isFavorite: false,
    hasAttachment: true,
    attachments: [
      { id: 'att-5', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
      { id: 'att-6', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
    priority: 'high',
  },
  {
    id: 'email-3',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Hoje',
    time: '08:30',
    isRead: false,
    isFavorite: false,
    hasAttachment: true,
    attachments: [
      { id: 'att-7', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
  },
  {
    id: 'email-4',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Dia 00/00',
    time: '08:30',
    isRead: true,
    isFavorite: false,
    hasAttachment: true,
    attachments: [
      { id: 'att-8', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
  },
  {
    id: 'email-5',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Dia 00/00',
    time: '08:30',
    isRead: false,
    isFavorite: false,
    hasAttachment: true,
    attachments: [
      { id: 'att-9', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
  },
  {
    id: 'email-6',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Dia 00/00',
    time: '08:30',
    isRead: false,
    isFavorite: false,
    hasAttachment: true,
    attachments: [
      { id: 'att-10', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
  },
  {
    id: 'email-7',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Dia 00/00',
    time: '08:30',
    isRead: false,
    isFavorite: false,
    hasAttachment: true,
    attachments: [
      { id: 'att-11', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
  },
  {
    id: 'email-8',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    from: {
      name: 'Diretoria Executiva',
      email: 'airtondasilva@sefaz.ms.gov.br',
      initials: 'D',
      color: '#1890ff',
    },
    to: ['UGARQUI'],
    preview: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CITI.',
    body: bodyText,
    date: 'Dia 00/00',
    time: '08:30',
    isRead: false,
    isFavorite: false,
    hasAttachment: true,
    attachments: [
      { id: 'att-12', name: 'Nome do arquivo', type: 'PDF', size: 'tamanho do arquivo' },
    ],
    folder: 'inbox',
  },
];
