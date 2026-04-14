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
    iconColor: '#52c41a',
    iconBg: '#f6ffed',
    title: 'Processos',
    total: 12,
    pill: { label: '4 pendentes', color: '#1890ff' },
    subtitle: 'em andamento',
  },
  {
    id: 'noticias',
    icon: 'newspaper',
    iconColor: '#722ed1',
    iconBg: '#f9f0ff',
    title: 'Notícias',
    total: 5,
    pill: { label: '2 novas', color: '#1890ff' },
    subtitle: 'publicadas hoje',
  },
  {
    id: 'agenda',
    icon: 'calendar_today',
    iconColor: '#fa8c16',
    iconBg: '#fff7e6',
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

export const StatusCards: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        margin: '16px 0 24px 0',
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
            border: hoveredId === card.id ? '1px solid #1890ff' : '1px solid #f0f0f0',
            boxShadow: hoveredId === card.id ? '0 4px 12px rgba(24,144,255,0.12)' : '0 1px 4px rgba(0,0,0,0.06)',
            padding: '20px',
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
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span
                  className="material-icons"
                  style={{ color: card.iconColor, fontSize: '22px' }}
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
            marginBottom: '6px',
          }}>
            {card.total}
          </div>

          <div style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: '13px',
            color: '#8c8c8c',
            marginBottom: '16px',
          }}>
            {card.subtitle}
          </div>

          <div style={{
            borderTop: '1px solid #f0f0f0',
            marginBottom: '10px',
          }} />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '12px',
            color: '#bfbfbf',
          }}>
            <span className="material-icons" style={{ fontSize: '13px', color: '#bfbfbf' }}>
              sync
            </span>
            Sincronizado às {syncTime}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatusCards
