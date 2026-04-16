import React, { useState } from 'react'

export function StatusCards() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const cards = [
    {
      id: 'email',
      icon: 'mail',
      title: 'E-mail',
      pill: '3 novos',
      total: 8,
      subtitle: 'na caixa de entrada',
      preview: 'João Silva: "Preciso da sua aprovação no relatório..."',
      time: 'há 5 min',
      urgent: false,
      timeIcon: 'mail_outline',
    },
    {
      id: 'processos',
      icon: 'assignment',
      title: 'Processos',
      pill: '4 pendentes',
      total: 12,
      subtitle: 'em andamento',
      preview: 'Processo #2024-089 aguarda assinatura',
      time: 'Vence hoje',
      urgent: true,
      timeIcon: 'pending_actions',
    },
    {
      id: 'noticias',
      icon: 'newspaper',
      title: 'Notícias',
      pill: '2 novas',
      total: 5,
      subtitle: 'publicadas hoje',
      preview: 'Novo decreto regulamenta uso de IA no serviço público...',
      time: 'há 1h',
      urgent: false,
      timeIcon: 'fiber_new',
    },
    {
      id: 'agenda',
      icon: 'calendar_today',
      title: 'Agenda',
      pill: '3 hoje',
      total: 3,
      subtitle: 'eventos agendados',
      preview: 'Reunião de Planejamento • Sala 01',
      time: '08:00 - 09:00',
      urgent: false,
      timeIcon: 'schedule',
    },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      width: '100%',
    }}>
      {cards.map((card) => (
        <div
          key={card.id}
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: hoveredId === card.id ? '1px solid #91caff' : '1px solid #f0f0f0',
            boxShadow: hoveredId === card.id
              ? '0 4px 12px rgba(24,144,255,0.10)'
              : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: hoveredId === card.id ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          {/* Topo: ícone + título + pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                background: '#e6f4ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span className="material-icons" style={{ color: '#1890ff', fontSize: '20px' }}>
                  {card.icon}
                </span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#262626' }}>
                {card.title}
              </span>
            </div>
            <span style={{
              background: '#1890ff',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
            }}>
              {card.pill}
            </span>
          </div>

          {/* Número principal */}
          <div style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#262626',
            lineHeight: '1',
            marginBottom: '6px',
          }}>
            {card.total}
          </div>

          {/* Subtexto */}
          <div style={{
            fontSize: '13px',
            color: '#8c8c8c',
            marginBottom: '16px',
          }}>
            {card.subtitle}
          </div>

          {/* Separador */}
          <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '10px' }} />

          {/* Rodapé com preview e urgência */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{
              fontSize: '12px',
              color: '#595959',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {card.preview}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{
                fontSize: '11px',
                color: card.urgent ? '#cf1322' : '#bfbfbf',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: card.urgent ? 600 : 400,
              }}>
                <span className="material-icons" style={{
                  fontSize: '12px',
                  color: card.urgent ? '#cf1322' : '#bfbfbf',
                }}>
                  {card.timeIcon}
                </span>
                {card.time}
              </div>
              {card.urgent && (
                <span style={{
                  background: '#fff2f0',
                  border: '1px solid #ffccc7',
                  color: '#cf1322',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}>
                  <span className="material-icons" style={{ fontSize: '10px' }}>warning</span>
                  Urgente
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatusCards