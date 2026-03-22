import React from 'react';
import { Newspaper, ChevronRight, Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Nova Política de Segurança da Informação em Vigor',
    description: 'A partir desta semana, todas as estações de trabalho deverão seguir as novas diretrizes de segurança aprovadas pela CGTI.',
    date: '20 Jan 2026',
    category: 'Segurança',
  },
  {
    id: '2',
    title: 'Atualização do Sistema de Ponto Eletrônico',
    description: 'O sistema de ponto eletrônico passará por manutenção programada no próximo sábado das 8h às 12h.',
    date: '19 Jan 2026',
    category: 'Sistemas',
  },
  {
    id: '3',
    title: 'Recadastramento de Benefícios - Prazo Final',
    description: 'Lembrete: o prazo para recadastramento do vale-refeição e vale-transporte encerra em 31 de janeiro.',
    date: '18 Jan 2026',
    category: 'RH',
  },
];

export const NewsModule: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Module Header */}
      <div className="border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Notícias</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
          Ver todas
          <ChevronRight size={14} />
        </button>
      </div>

      {/* News Content */}
      <div className="p-5">
        <div className="space-y-4">
          {mockNews.map(news => (
            <div
              key={news.id}
              className="cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-yellow-400 text-gray-900 text-xs font-semibold rounded">
                  {news.category}
                </span>
                <span className="text-xs text-gray-500">
                  {news.date}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-1 text-sm leading-tight">
                {news.title}
              </h3>
              
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {news.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};