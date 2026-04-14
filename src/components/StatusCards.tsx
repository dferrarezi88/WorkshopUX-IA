import React, { useState } from 'react'
import { MaterialIcon } from './MaterialIcon'

interface StatusCard {
  id: string
  icon: string
  iconColor: string
  iconBg: string
  title: string
  total: number | string
  pill: {
    label: string
    color: string
  }
  subtitle: string
}

const cards: StatusCard[] = [
  {
    id: 'email',
    icon: 'mail',
    iconColor: '#1890ff',
    iconBg: '#e6f4ff',
    title: 'E-mail',
    total: 8,
    pill: { label: '3 novos', color: '#1890ff' },
    subtitle: 'na caixa de entrada',
  },
  {
    id: 'processos',
    icon: 'assignment',
    iconColor: '#1890ff',
    iconBg: '#e6f4ff',
    title: 'Processos',
    total: 12,
    pill: { label: '4 pendentes', color: '#fa8c16' },
    subtitle: 'em andamento',
  },
  {
    id: 'noticias',
    icon: 'newspaper',
    iconColor: '#1890ff',
    iconBg: '#e6f4ff',
    title: 'Notícias',
    total: 5,
    pill: { label: '2 novas', color: '#52c41a' },
    subtitle: 'publicadas hoje',
  },
  {
    id: 'agenda',
    icon: 'calendar_today',
    iconColor: '#1890ff',
    iconBg: '#e6f4ff',
    title: 'Agenda',
    total: 3,
    pill: { label: '3 hoje', color: '#1890ff' },
    subtitle: 'eventos agendados',
  },
]

const syncTime = new Date().toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

interface StatusCardsProps {
  inCalendarModule?: boolean
}

export const StatusCards: React.FC<StatusCardsProps> = ({ inCalendarModule = false }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        margin: inCalendarModule ? '0' : '16px 0 24px 0',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: hoveredId === card.id ? '1px solid #91caff' : '1px solid #f0f0f0',
            boxShadow: hoveredId === card.id ? '0 4px 12px rgba(24,144,255,0.10)' : (inCalendarModule ? 'none' : '0 1px 3px rgba(0,0,0,0.04)'),
            padding: inCalendarModule ? '14px' : '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: hoveredId === card.id ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                background: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span
                  className="material-icons"
                  style={{ color: card.iconColor, fontSize: '20px' }}
                >
                  {card.icon}
                </span>
              </div>
              <span style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#262626',
              }}>
                {card.title}
              </span>
            </div>

            <span style={{
              background: card.pill.color,
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: "'Roboto', sans-serif",
              padding: '3px 10px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
            }}>
              {card.pill.label}
            </span>
          </div>

          <div style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: '36px',
            fontWeight: 700,
            color: '#262626',
            lineHeight: '1',
            marginBottom: '4px',
          }}>
            {card.total}
          </div>

          <div style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#8c8c8c',
          }}>
            {card.subtitle}
          </div>

          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #f0f0f0',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '12px',
            color: '#bfbfbf',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <MaterialIcon name="sync" size={14} />
            <span>Sincronizado às {syncTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
};