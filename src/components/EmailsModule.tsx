import React from 'react';
import { Mail, ChevronRight, Paperclip, Flag } from 'lucide-react';

interface EmailItem {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  important: boolean;
  hasAttachment: boolean;
}

const mockEmails: EmailItem[] = [
  {
    id: '1',
    from: 'Diretoria Executiva',
    subject: 'Comunicado Oficial - Nova Política de Segurança',
    preview: 'Prezados colaboradores, informamos que a partir de 01/02...',
    time: '08:45',
    unread: true,
    important: true,
    hasAttachment: true,
  },
  {
    id: '2',
    from: 'TI - Suporte',
    subject: 'Manutenção programada - Sistema de Ponto',
    preview: 'Será realizada manutenção programada no sistema de ponto eletrônico...',
    time: '10:20',
    unread: true,
    important: false,
    hasAttachment: false,
  },
  {
    id: '3',
    from: 'RH - Benefícios',
    subject: 'Período de Recadastramento - Vale Refeição',
    preview: 'Lembramos que o período de recadastramento do vale refeição...',
    time: 'Ontem',
    unread: true,
    important: false,
    hasAttachment: true,
  },
  {
    id: '4',
    from: 'Coordenação de Projetos',
    subject: 'Atualização Projeto XYZ - Milestone Concluído',
    preview: 'Informamos que o milestone 3 do projeto XYZ foi concluído...',
    time: 'Ontem',
    unread: false,
    important: false,
    hasAttachment: false,
  },
];

export const EmailsModule: React.FC = () => {
  const unreadCount = mockEmails.filter(e => e.unread).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Module Header */}
      <div className="border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900">E-mails</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
          Ver todos
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Emails Content */}
      <div className="p-5">
        <div className="space-y-3">
          {mockEmails.map(email => (
            <div
              key={email.id}
              className="cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2.5 rounded transition-colors"
            >
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-semibold text-xs">
                  {email.from.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <h3 className={`text-sm flex-1 min-w-0 truncate ${email.unread ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>
                      {email.subject}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {email.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">De: {email.from}</p>
                  <p className="text-xs text-gray-600 line-clamp-1">{email.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};