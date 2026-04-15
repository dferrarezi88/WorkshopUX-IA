import React, { useState } from 'react'

const cards = [
  { id: 'email', icon: 'mail', title: 'E-mail', pill: '3 novos', total: 8, subtitle: 'na caixa de entrada' },
  { id: 'processos', icon: 'assignment', title: 'Processos', pill: '4 pendentes', total: 12, subtitle: 'em andamento' },
  { id: 'noticias', icon: 'newspaper', title: 'Notícias', pill: '2 novas', total: 5, subtitle: 'publicadas hoje' },
  { id: 'agenda', icon: 'calendar_today', title: 'Agenda', pill: '3 hoje', total: 3, subtitle: 'eventos agendados' },
]

export const StatusCards: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const syncTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%', marginBottom: '28px' }}>
      {cards.map((card) => (
        <div key={card.id}
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            background: '#ffffff', borderRadius: '8px',
            border: hoveredId === card.id ? '1px solid #91caff' : '1px solid #f0f0f0',
            boxShadow: hoveredId === card.id ? '0 4px 12px rgba(24,144,255,0.10)' : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '20px', cursor: 'pointer', transition: 'all 0.2s ease',
            transform: hoveredId === card.id ? 'translateY(-2px)' : 'translateY(0)',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-icons" style={{ color: '#1890ff', fontSize: '20px' }}>{card.icon}</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#262626' }}>{card.title}</span>
            </div>
            <span style={{ background: '#1890ff', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
              {card.pill}
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: '#262626', lineHeight: '1', marginBottom: '6px' }}>{card.total}</div>
          <div style={{ fontSize: '13px', color: '#8c8c8c', marginBottom: '16px' }}>{card.subtitle}</div>
          <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#bfbfbf' }}>
            <span className="material-icons" style={{ fontSize: '13px' }}>sync</span>
            Sincronizado às {syncTime}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatusCards