import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon'; // CORREÇÃO 1: Material Design icons
import type { CalendarEvent } from '../App';
import type { UserProfile } from '../App';

// Componente de pill de status
const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, { bg: string; border: string; color: string; label: string }> = {
    PENDING: {
      bg: '#fffbe6',
      border: '1px solid #ffe58f',
      color: '#ad6800',
      label: 'Pendente',
    },
    PENDING_EDIT: {
      bg: '#e6f4ff',
      border: '1px solid #91caff',
      color: '#0958d9',
      label: 'Pendente Alteração',
    },
    CANCELED: {
      bg: '#fff2f0',
      border: '1px solid #ffccc7',
      color: '#cf1322',
      label: 'Cancelado',
    },
    ACCEPTED: {
      bg: '#f6ffed',
      border: '1px solid #b7eb8f',
      color: '#389e0d',
      label: 'Confirmado',
    },
    DECLINED: {
      bg: '#fff2f0',
      border: '1px solid #ffccc7',
      color: '#cf1322',
      label: 'Recusado',
    },
  }

  const style = styles[status]
  if (!style) return null

  return (
    <span style={{
      background: style.bg,
      border: style.border,
      color: style.color,
      fontSize: '10px',
      fontWeight: 600,
      padding: '2px 6px',
      borderRadius: '10px',
      whiteSpace: 'nowrap',
      display: 'inline-block',
    }}>
      {style.label}
    </span>
  )
}

interface CalendarModuleProps {
  expanded: boolean;
  onToggleExpand: () => void;
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date?: Date) => void;
  userProfile: UserProfile;
  agendaViewMode: 'colaborador' | 'secretaria';
  onAgendaViewModeChange: (mode: 'colaborador' | 'secretaria') => void;
  roomColors?: Record<string, string>; // ALTERAÇÃO 2: cores das salas
  onOpenRoomColorConfig?: () => void; // NOVA: callback para abrir modal de config de cores
  currentUser?: string; // CORREÇÃO 2: usuário logado
  eventStatuses?: Record<string, 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'PENDING_EDIT'>; // Status dos eventos
}

type ViewMode = 'dia' | 'semana' | 'mes' | 'agenda';

interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  color: string;
}

const rooms: Room[] = [
  { id: '1', name: 'Sala 01', type: 'Reunião', capacity: 10, color: '#93C5FD' }, // azul
  { id: '2', name: 'Sala 02', type: 'Reunião', capacity: 8, color: '#FEF08A' }, // amarelo
  { id: '3', name: 'Sala 03', type: 'Treinamento', capacity: 20, color: '#FCA5A5' }, // vermelho
];

// Eventos fictícios para simulação real - João Silva é o usuário logado
const mockEvents: CalendarEvent[] = [
  // Eventos criados por João Silva (usuário logado)
  {
    id: '1',
    title: 'Reunião de Planejamento',
    date: new Date(2026, 1, 19), // 19 Fev 2026 (hoje)
    startTime: '08:00',
    endTime: '09:00',
    room: 'Sala 01',
    organizer: 'João Silva',
    responsible: 'João Silva',
    participants: 5,
    participantNames: ['João Silva', 'Maria Santos', 'Pedro Costa'],
    water: true,
    coffee: true,
  },
  {
    id: '2',
    title: 'Daily de Projeto',
    date: new Date(2026, 1, 19),
    startTime: '09:30',
    endTime: '10:30',
    room: 'Sala 02',
    organizer: 'João Silva',
    responsible: 'João Silva',
    participants: 4,
    participantNames: ['João Silva', 'Carlos Silva', 'Ana Paula'],
    water: false,
    coffee: false,
  },
  {
    id: '3',
    title: 'Reunião criada pelo usuário',
    date: new Date(2026, 1, 19),
    startTime: '14:00',
    endTime: '15:00',
    room: 'Sala 01',
    organizer: 'João Silva',
    responsible: 'João Silva',
    participants: 3,
    participantNames: ['João Silva', 'Maria Santos'],
    water: true,
    coffee: false,
  },
  {
    id: '14',
    title: 'Workshop Técnico',
    date: new Date(2026, 1, 19),
    startTime: '16:00',
    endTime: '17:00',
    room: 'Sala 02',
    organizer: 'João Silva',
    responsible: 'João Silva',
    participants: 8,
    participantNames: ['João Silva', 'Equipe Dev'],
    water: true,
    coffee: true,
  },
  
  // CORREÇÃO 2: Eventos PENDENTES - João Silva foi convidado
  {
    id: '4',
    title: 'Revisão de Processos',
    date: new Date(2026, 1, 19),
    startTime: '08:00',
    endTime: '09:00',
    room: 'Sala 01',
    organizer: 'Carlos Silva',
    responsible: 'Carlos Silva',
    participants: 6,
    participantNames: ['Carlos Silva', 'João Silva', 'Maria Santos', 'Ana Paula'],
    water: true,
    coffee: false,
    inviteStatus: 'PENDING',
  },
  {
    id: '15',
    title: 'Planejamento Estratégico',
    date: new Date(2026, 1, 19),
    startTime: '10:00',
    endTime: '11:00',
    room: 'Sala 02',
    organizer: 'Maria Santos',
    responsible: 'Maria Santos',
    participants: 8,
    participantNames: ['Maria Santos', 'João Silva', 'Pedro Costa'],
    water: true,
    coffee: true,
    inviteStatus: 'PENDING',
  },
  {
    id: '16',
    title: 'Alinhamento de Projeto',
    date: new Date(2026, 1, 19),
    startTime: '13:00',
    endTime: '14:00',
    room: 'Sala 03',
    organizer: 'Ana Paula',
    responsible: 'Ana Paula',
    participants: 5,
    participantNames: ['Ana Paula', 'João Silva', 'Carlos Silva'],
    water: false,
    coffee: true,
    inviteStatus: 'PENDING',
  },
  
  // Eventos sem relação com João Silva (apenas "ocupado")
  {
    id: '5',
    title: 'Reunião Diretoria',
    date: new Date(2026, 1, 19),
    startTime: '11:00',
    endTime: '12:00',
    room: 'Sala 03',
    organizer: 'Maria Santos',
    responsible: 'Maria Santos',
    participants: 10,
    participantNames: ['Maria Santos', 'Pedro Costa', 'Fernanda Lima'],
    water: true,
    coffee: true,
  },
  {
    id: '6',
    title: 'Apresentação Resultados',
    date: new Date(2026, 1, 19),
    startTime: '13:00',
    endTime: '14:00',
    room: 'Sala 02',
    organizer: 'Ana Paula',
    responsible: 'Ana Paula',
    participants: 12,
    participantNames: ['Ana Paula', 'Pedro Costa'],
    water: true,
    coffee: true,
  },
  
  // Eventos da semana para visualização semanal
  {
    id: '7',
    title: 'teste1',
    date: new Date(2026, 1, 18), // 18 Fev (quarta)
    startTime: '09:00',
    endTime: '10:00',
    room: 'Sala 01',
    organizer: 'João Silva',
    responsible: 'João Silva',
    participants: 3,
    participantNames: ['João Silva', 'Maria Santos'],
    water: false,
    coffee: false,
  },
  {
    id: '8',
    title: 'teste2',
    date: new Date(2026, 1, 18),
    startTime: '09:00',
    endTime: '10:00',
    room: 'Sala 02',
    organizer: 'Carlos Silva',
    responsible: 'Carlos Silva',
    participants: 4,
    participantNames: ['Carlos Silva', 'Ana Paula'],
    water: false,
    coffee: false,
  },
  {
    id: '9',
    title: 'teste3',
    date: new Date(2026, 1, 19), // 19 Fev (quinta)
    startTime: '09:00',
    endTime: '10:00',
    room: 'Sala 01',
    organizer: 'Maria Santos',
    responsible: 'Maria Santos',
    participants: 5,
    participantNames: ['Maria Santos', 'Pedro Costa'],
    water: true,
    coffee: false,
  },
  {
    id: '10',
    title: 'teste4',
    date: new Date(2026, 1, 19),
    startTime: '09:00',
    endTime: '10:00',
    room: 'Sala 03',
    organizer: 'Pedro Costa',
    responsible: 'Pedro Costa',
    participants: 7,
    participantNames: ['Pedro Costa', 'Fernanda Lima'],
    water: true,
    coffee: true,
  },
  {
    id: '11',
    title: 'Alinhamento Estratégico',
    date: new Date(2026, 1, 20), // 20 Fev (sexta)
    startTime: '09:00',
    endTime: '10:00',
    room: 'Sala 02',
    organizer: 'Ana Paula',
    responsible: 'Ana Paula',
    participants: 4,
    participantNames: ['Ana Paula', 'Carlos Silva', 'João Silva'],
    water: false,
    coffee: true,
    inviteStatus: 'PENDING', // CORREÇÃO 2: Convite pendente
  },
  {
    id: '12',
    title: 'teste6',
    date: new Date(2026, 1, 20),
    startTime: '13:00',
    endTime: '14:00',
    room: 'Sala 01',
    organizer: 'João Silva',
    responsible: 'João Silva',
    participants: 6,
    participantNames: ['João Silva', 'Maria Santos', 'Pedro Costa'],
    water: true,
    coffee: true,
  },
  {
    id: '13',
    title: 'teste7',
    date: new Date(2026, 1, 20),
    startTime: '13:00',
    endTime: '14:00',
    room: 'Sala 03',
    organizer: 'Maria Santos',
    responsible: 'Maria Santos',
    participants: 8,
    participantNames: ['Maria Santos', 'Ana Paula'],
    water: true,
    coffee: false,
  },
  {
    id: '17',
    title: 'Reunião Cancelada - Exemplo',
    date: new Date(2026, 1, 19),
    startTime: '15:00',
    endTime: '16:00',
    room: 'Sala 03',
    organizer: 'João Silva',
    responsible: 'João Silva',
    participants: 4,
    participantNames: ['João Silva', 'Maria Santos'],
    water: false,
    coffee: false,
    inviteStatus: 'CANCELED',
  },
];

export const CalendarModule: React.FC<CalendarModuleProps> = ({ 
  expanded, 
  onToggleExpand, 
  onEventClick, 
  onCreateEvent,
  userProfile,
  agendaViewMode,
  onAgendaViewModeChange,
  roomColors = {}, // ALTERAÇÃO 2
  onOpenRoomColorConfig, // NOVA
  currentUser = 'João Silva', // CORREÇÃO 2
  eventStatuses = {}, // Status dos eventos
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('agenda');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 19)); // 19 Fev 2026
  const [selectedRoomFilters, setSelectedRoomFilters] = useState<string[]>(['all']); // MULTISELECT
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents); // Gerenciar estado dos eventos

  const weekDays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
  const weekDaysShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Função para obter o status atual do evento (prioriza eventStatuses)
  const getEventStatus = (event: CalendarEvent): 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'PENDING_EDIT' | 'CANCELED' | undefined => {
    return eventStatuses[event.id] || event.inviteStatus;
  };

  // Função para obter cor da sala - ALTERAÇÃO 2: usa cores configuradas pelo usuário
  const getRoomColor = (roomName: string) => {
    // Primeiro tenta encontrar a sala nos mockRooms do CreateEventModal
    const roomIdMap: Record<string, string> = {
      'Sala 101': '1',
      'Sala 102': '2',
      'Sala 103': '3',
      'Sala 201': '4',
      'Sala 202': '5',
      'Auditório Principal': '6',
      'Sala 01': '1', // Mapeamento para eventos mock
      'Sala 02': '2',
      'Sala 03': '3',
    };
    
    const roomId = roomIdMap[roomName];
    if (roomId && roomColors[roomId]) {
      return roomColors[roomId];
    }
    
    // Fallback para cores padrão
    const room = rooms.find(r => r.name === roomName);
    return room?.color || '#E5E7EB';
  };

  // Função auxiliar para obter ID da sala a partir do nome
  const getRoomIdFromName = (roomName: string): string | undefined => {
    const roomIdMap: Record<string, string> = {
      'Sala 101': '1',
      'Sala 102': '2',
      'Sala 103': '3',
      'Sala 201': '4',
      'Sala 202': '5',
      'Auditório Principal': '6',
      'Sala 01': '1',
      'Sala 02': '2',
      'Sala 03': '3',
    };
    return roomIdMap[roomName];
  };

  // REGRAS DE VISIBILIDADE POR PERFIL
  const getEventVisibility = (event: CalendarEvent) => {
    const userLogado = 'João Silva'; // Simulando usuário logado
    
    if (agendaViewMode === 'secretaria') {
      return {
        type: 'full' as const,
        canCancel: true,
        canEdit: true,
      };
    }
    
    // COLABORADOR
    // 1. Eventos criados por ele
    if (event.organizer === userLogado) {
      return {
        type: 'owner' as const,
        canCancel: true,
        canEdit: false,
      };
    }
    
    // 2. Eventos em que ele participa
    if (event.participantNames?.includes(userLogado)) {
      return {
        type: 'participant' as const,
        canCancel: false,
        canEdit: false,
      };
    }
    
    // 3. Eventos sem relação (apenas "ocupado")
    return {
      type: 'busy' as const,
      canCancel: false,
      canEdit: false,
    };
  };

  // Função para obter eventos filtrados por MULTIPLAS SALAS
  const getFilteredEvents = () => {
    let filtered = [...events];

    // Filtro por sala (MULTISELECT)
    if (!selectedRoomFilters.includes('all')) {
      filtered = filtered.filter(e => selectedRoomFilters.includes(e.room));
    }

    return filtered;
  };

  // CONCATENAÇÃO DE REUNIÕES POR HORÁRIO
  const getConcatenatedEvents = (events: CalendarEvent[]) => {
    const groupedByDateTime: { [key: string]: CalendarEvent[] } = {};
    
    events.forEach(event => {
      const dateStr = event.date.toDateString();
      const timeKey = `${dateStr}-${event.startTime}-${event.endTime}`;
      
      if (!groupedByDateTime[timeKey]) {
        groupedByDateTime[timeKey] = [];
      }
      groupedByDateTime[timeKey].push(event);
    });
    
    return Object.entries(groupedByDateTime).map(([key, eventGroup]) => {
      if (eventGroup.length === 1) {
        return eventGroup[0];
      }
      
      // Múltiplos eventos no mesmo horário - concatenar títulos
      const visibility = getEventVisibility(eventGroup[0]);
      let concatenatedTitle = '';
      
      if (visibility.type === 'busy') {
        concatenatedTitle = 'Horário ocupado';
      } else {
        concatenatedTitle = eventGroup.map((e, idx) => {
          const vis = getEventVisibility(e);
          if (vis.type === 'busy') {
            return 'Ocupado';
          }
          return e.title;
        }).join(' / ');
      }
      
      return {
        ...eventGroup[0],
        id: `concat-${key}`,
        title: concatenatedTitle,
        isConcatenated: true,
        originalEvents: eventGroup,
      };
    });
  };

  // Toggle de seleção de sala (MULTISELECT)
  const toggleRoomFilter = (roomName: string) => {
    if (roomName === 'all') {
      setSelectedRoomFilters(['all']);
      return;
    }
    
    const newFilters = selectedRoomFilters.filter(f => f !== 'all');
    
    if (newFilters.includes(roomName)) {
      const updated = newFilters.filter(f => f !== roomName);
      setSelectedRoomFilters(updated.length === 0 ? ['all'] : updated);
    } else {
      setSelectedRoomFilters([...newFilters, roomName]);
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'agenda' || viewMode === 'dia') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'semana') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'mes') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 1, 19)); // Data simulada
  };

  const getDateTitle = () => {
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    if (viewMode === 'agenda' || viewMode === 'dia') {
      return `${currentDate.getDate()} de ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewMode === 'semana') {
      const weekStart = getWeekStart(currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewMode === 'mes') {
      return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    return '';
  };

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const handlePrint = (mode: 'dia' | 'semana' | 'mes' | 'agenda') => {
    console.log('Imprimir:', mode);
    
    const filtered = getFilteredEvents();
    
    let printContent = `
      <html>
        <head>
          <title>Impressão de Agenda - ${mode.charAt(0).toUpperCase() + mode.slice(1)}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #006ED8; border-bottom: 2px solid #006ED8; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #006ED8; color: white; }
          </style>
        </head>
        <body>
          <h1>Agendamento de Salas - ${mode === 'dia' ? 'Dia' : mode === 'semana' ? 'Semana' : mode === 'mes' ? 'Mês' : 'Agenda'}</h1>
          <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Horário</th>
                <th>Sala</th>
                <th>Reunião</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
    `;
    
    filtered.forEach(event => {
      const visibility = getEventVisibility(event);
      const title = visibility.type === 'busy' ? 'Horário ocupado' : event.title;
      const responsible = visibility.type === 'busy' ? '-' : event.responsible || event.organizer;
      
      printContent += `
        <tr>
          <td>${event.date.toLocaleDateString('pt-BR')}</td>
          <td>${event.startTime} - ${event.endTime}</td>
          <td>${event.room}</td>
          <td>${title}</td>
          <td>${responsible}</td>
        </tr>
      `;
    });
    
    printContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  // RENDERIZAÇÃO - AGENDA DO DIA (GRADE HORÁRIA)
  const renderDayView = () => {
    const timeSlots = [
      '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
    
    const dayEvents = getFilteredEvents().filter(e => 
      e.date.toDateString() === currentDate.toDateString()
    );
    
    const concatenatedEvents = getConcatenatedEvents(dayEvents);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Cabeçalho do dia */}
        <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-700">
            {currentDate.getDate()} {weekDays[currentDate.getDay()].toUpperCase()}
          </div>
        </div>
        
        {/* Grade horária */}
        <div className="divide-y divide-gray-200">
          {timeSlots.map((time, idx) => {
            const nextTime = timeSlots[idx + 1] || '19:00';
            
            // Encontrar eventos que ocupam este horário
            const eventsInSlot = concatenatedEvents.filter(e => {
              const eventStart = e.startTime;
              const eventEnd = e.endTime;
              return eventStart >= time && eventStart < nextTime;
            });
            
            return (
              <div key={time} className="relative flex min-h-[80px]">
                {/* Horário */}
                <div className="w-20 flex-shrink-0 px-3 py-2 text-sm text-gray-500 border-r border-gray-200">
                  {time}
                </div>
                
                {/* Área de eventos */}
                <div 
                  className="flex-1 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    // Se clicar na área vazia (não em um evento), criar novo agendamento
                    if (eventsInSlot.length === 0) {
                      onCreateEvent(currentDate);
                    }
                  }}
                >
                  {eventsInSlot.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                      Clique para criar agendamento
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '8px',
                      alignItems: 'flex-start',
                      width: '100%',
                    }}>
                      {eventsInSlot.map(event => {
                        const visibility = getEventVisibility(event);
                        const displayTitle = visibility.type === 'busy' ? 'Horário ocupado' : event.title;
                        
                        // Determinar itens da copa
                        let copaItems = '';
                        if (visibility.type !== 'busy') {
                          if (event.water && event.coffee) {
                            copaItems = 'Água e café';
                          } else if (event.water) {
                            copaItems = 'Água';
                          } else if (event.coffee) {
                            copaItems = 'Café';
                          }
                        }
                        
                        // CORREÇÃO 2 & 3: Verificar estado do evento
                        const currentStatus = getEventStatus(event);
                        const isPendingInvite = currentStatus === 'PENDING' && event.organizer !== currentUser;
                        const isPendingEdit = currentStatus === 'PENDING_EDIT';
                        const isAccepted = currentStatus === 'ACCEPTED';
                        const isDeclined = currentStatus === 'DECLINED';
                        const isCanceled = currentStatus === 'CANCELED';
                        
                        return (
                          <div
                            key={event.id}
                            className="p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity relative"
                            style={{
                              backgroundColor: getRoomColor(event.room),
                              flex: '1 1 0',
                              minWidth: '0',
                            }}
                          >
                            {/* PARTE 2: Overlay com linhas diagonais para eventos pendentes */}
                            {(isPendingInvite || isPendingEdit) && (
                              <div 
                                className="absolute inset-0 rounded pointer-events-none"
                                style={{
                                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 13px)'
                                }}
                              />
                            )}
                            
                            {/* Overlay para eventos cancelados */}
                            {isCanceled && (
                              <div
                                className="absolute inset-0 rounded pointer-events-none"
                                style={{ background: 'rgba(255,255,255,0.5)' }}
                              />
                            )}
                            
                            {/* Pill de status */}
                            {currentStatus && (
                              <div className="absolute top-2 right-2 z-10">
                                <StatusPill status={currentStatus} />
                              </div>
                            )}
                            
                            <div onClick={() => onEventClick(event)} className="relative z-10">
                              {/* Horário - CORREÇÃO 1: Material Icon */}
                              <div className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <MaterialIcon name="schedule" size={14} />
                                {event.startTime} - {event.endTime}
                              </div>
                              
                              {/* Nome da reunião - CORREÇÃO 1: Material Icon */}
                              <div className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-1">
                                <MaterialIcon name="description" size={14} />
                                {displayTitle}
                              </div>
                              
                              {/* Sala - CORREÇÃO 1: Material Icon */}
                              <div className="text-xs text-gray-600 flex items-center gap-1">
                                <MaterialIcon name="place" size={14} />
                                {event.room}
                              </div>
                              
                              {/* Quantidade de participantes - CORREÇÃO 1: Material Icon */}
                              {visibility.type !== 'busy' && (
                                <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                                  <MaterialIcon name="people" size={14} />
                                  {event.participants} participante{event.participants > 1 ? 's' : ''}
                                </div>
                              )}
                              
                              {/* Itens da copa - CORREÇÃO 1: Material Icon */}
                              {copaItems && (
                                <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                                  <MaterialIcon name="local_cafe" size={14} />
                                  {copaItems}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // RENDERIZAÇÃO - VISUALIZAÇÃO SEMANA
  const renderWeekView = () => {
    const weekStart = getWeekStart(currentDate);
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
    
    const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    
    const weekEvents = getFilteredEvents().filter(e => {
      const eventDate = e.date;
      return eventDate >= weekDates[0] && eventDate <= weekDates[6];
    });
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Cabeçalho dos dias */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="px-3 py-2 text-xs font-medium text-gray-500 border-r border-gray-200"></div>
            {weekDates.map((date, idx) => (
              <div key={idx} className="px-3 py-3 text-center border-r border-gray-200">
                <div className="text-xs font-medium text-gray-500">{weekDaysShort[date.getDay()]}</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{date.getDate()}</div>
              </div>
            ))}
          </div>
          
          {/* Grade de horários */}
          <div className="divide-y divide-gray-200">
            {timeSlots.map((time, timeIdx) => (
              <div key={time} className="grid grid-cols-8" style={{ minHeight: '60px' }}>
                <div className="px-3 py-2 text-xs text-gray-500 border-r border-gray-200">
                  {time}
                </div>
                {weekDates.map((date, dayIdx) => {
                  const nextTime = timeSlots[timeIdx + 1] || '19:00';
                  const dayEventsForSlot = weekEvents.filter(e => 
                    e.date.toDateString() === date.toDateString() &&
                    e.startTime >= time &&
                    e.startTime < nextTime
                  );
                  
                  const concatenatedEvents = getConcatenatedEvents(dayEventsForSlot);
                  
                  return (
                    <div 
                      key={dayIdx} 
                      className="px-2 py-2 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        if (concatenatedEvents.length === 0) {
                          onCreateEvent(date);
                        }
                      }}
                    >
                      {concatenatedEvents.length > 0 ? (
                        <div className="space-y-1">
                          {concatenatedEvents.map(event => {
                            const visibility = getEventVisibility(event);
                            const displayTitle = visibility.type === 'busy' ? 'Horário ocupado' : event.title;
                            
                            // Determinar itens da copa
                            let copaItems = '';
                            if (visibility.type !== 'busy') {
                              if (event.water && event.coffee) {
                                copaItems = 'Água e café';
                              } else if (event.water) {
                                copaItems = 'Água';
                              } else if (event.coffee) {
                                copaItems = 'Café';
                              }
                            }
                            
                            // CORREÇÃO 2 & 3: Verificar status
                            const currentStatus = getEventStatus(event);
                            const isPendingInvite = currentStatus === 'PENDING' && event.organizer !== currentUser;
                            const isPendingEdit = currentStatus === 'PENDING_EDIT';
                            const isAccepted = currentStatus === 'ACCEPTED';
                            const isDeclined = currentStatus === 'DECLINED';
                            const isCanceled = currentStatus === 'CANCELED';
                            
                            return (
                              <div
                                key={event.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!isPendingInvite) onEventClick(event);
                                }}
                                className="p-2 rounded text-xs cursor-pointer hover:opacity-90 transition-opacity relative"
                                style={{ backgroundColor: getRoomColor(event.room) }}
                              >
                                {/* PARTE 2: Overlay com linhas diagonais para eventos pendentes */}
                                {(isPendingInvite || isPendingEdit) && (
                                  <div 
                                    className="absolute inset-0 rounded pointer-events-none"
                                    style={{
                                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 13px)'
                                    }}
                                  />
                                )}
                                
                                {/* Overlay para eventos cancelados */}
                                {isCanceled && (
                                  <div
                                    className="absolute inset-0 rounded pointer-events-none"
                                    style={{ background: 'rgba(255,255,255,0.5)' }}
                                  />
                                )}
                                
                                {/* Pill de status */}
                                {currentStatus && (
                                  <div className="absolute top-2 right-2 z-10">
                                    <StatusPill status={currentStatus} />
                                  </div>
                                )}
                                
                                <div className="relative z-10">
                                  <div className="font-medium text-gray-900 truncate">
                                    {displayTitle}
                                  </div>
                                  <div className="text-gray-600 text-[10px] mt-0.5 space-y-0.5">
                                    <div className="flex items-center gap-1">
                                      <MaterialIcon name="schedule" size={10} />
                                      {event.startTime} - {event.endTime}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MaterialIcon name="place" size={10} />
                                      {event.room}
                                    </div>
                                    {visibility.type !== 'busy' && (
                                      <div className="flex items-center gap-1">
                                        <MaterialIcon name="people" size={10} />
                                        {event.participants} part.
                                      </div>
                                    )}
                                    {copaItems && (
                                      <div className="flex items-center gap-1">
                                        <MaterialIcon name="local_cafe" size={10} />
                                        {copaItems}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-[10px]">
                          +
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // RENDERIZAÇÃO - VISUALIZAÇÃO MÊS
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    const monthEvents = getFilteredEvents().filter(e => 
      e.date.getMonth() === month && e.date.getFullYear() === year
    );
    
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDaysShort.map((day, idx) => (
            <div key={idx} className="px-3 py-2 text-xs font-medium text-gray-500 text-center border-r last:border-r-0 border-gray-200">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grade de dias */}
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayDate = day ? new Date(year, month, day) : null;
            const dayEventsRaw = dayDate ? monthEvents.filter(e => 
              e.date.toDateString() === dayDate.toDateString()
            ) : [];
            
            const dayEvents = getConcatenatedEvents(dayEventsRaw);
            
            return (
              <div 
                key={idx} 
                className="min-h-[120px] border-r border-b last:border-r-0 border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  if (dayDate && dayEvents.length === 0) {
                    onCreateEvent(dayDate);
                  }
                }}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium text-gray-700 mb-2">{day}</div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map(event => {
                        const visibility = getEventVisibility(event);
                        const displayTitle = visibility.type === 'busy' ? 'Horário ocupado' : event.title;
                        
                        // Determinar itens da copa
                        let copaItems = '';
                        if (visibility.type !== 'busy') {
                          if (event.water && event.coffee) {
                            copaItems = 'Água e café';
                          } else if (event.water) {
                            copaItems = 'Água';
                          } else if (event.coffee) {
                            copaItems = 'Café';
                          }
                        }
                        
                        // CORREÇÃO 2 & 3: Verificar status
                        const currentStatus = getEventStatus(event);
                        const isPendingInvite = currentStatus === 'PENDING' && event.organizer !== currentUser;
                        const isPendingEdit = currentStatus === 'PENDING_EDIT';
                        const isAccepted = currentStatus === 'ACCEPTED';
                        const isDeclined = currentStatus === 'DECLINED';
                        const isCanceled = currentStatus === 'CANCELED';
                        
                        return (
                          <div
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(event);
                            }}
                            className="px-2 py-1.5 rounded text-xs cursor-pointer hover:opacity-90 transition-opacity relative"
                            style={{ backgroundColor: getRoomColor(event.room) }}
                          >
                            {/* Overlay para eventos cancelados */}
                            {isCanceled && (
                              <div
                                className="absolute inset-0 rounded pointer-events-none"
                                style={{ background: 'rgba(255,255,255,0.5)' }}
                              />
                            )}
                            
                            {/* Pill de status */}
                            {currentStatus && currentStatus !== 'ACCEPTED' && (
                              <StatusPill status={currentStatus} />
                            )}
                            {currentStatus === 'ACCEPTED' && (
                              <StatusPill status="ACCEPTED" />
                            )}
                            
                            {/* Horário e Nome - CORREÇÃO 1: Material Icons */}
                            <div className="font-medium text-gray-900 truncate mb-0.5 flex items-center gap-1">
                              <MaterialIcon name="schedule" size={10} />
                              {event.startTime} {displayTitle}
                            </div>
                            
                            {/* Sala - CORREÇÃO 1: Material Icon */}
                            <div className="text-gray-700 truncate flex items-center gap-1">
                              <MaterialIcon name="place" size={10} />
                              {event.room}
                            </div>
                            
                            {/* Participantes - CORREÇÃO 1: Material Icon */}
                            {visibility.type !== 'busy' && (
                              <div className="text-gray-700 truncate flex items-center gap-1">
                                <MaterialIcon name="people" size={10} />
                                {event.participants} part.
                              </div>
                            )}
                            
                            {/* Itens da copa - CORREÇÃO 1: Material Icon */}
                            {copaItems && (
                              <div className="text-gray-700 truncate flex items-center gap-1">
                                <MaterialIcon name="local_cafe" size={10} />
                                {copaItems}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 px-2">
                          +{dayEvents.length - 3} mais
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // RENDERIZAÇÃO - VISUALIZAÇÃO AGENDA (LISTA)
  const renderAgendaView = () => {
    const allEvents = getFilteredEvents().sort((a, b) => {
      const dateCompare = a.date.getTime() - b.date.getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });
    
    const concatenatedEvents = getConcatenatedEvents(allEvents);
    
    const groupedByDate: { [key: string]: typeof concatenatedEvents } = {};
    concatenatedEvents.forEach(event => {
      const dateKey = event.date.toDateString();
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(event);
    });
    
    return (
      <div className="space-y-4">
        {Object.entries(groupedByDate).map(([dateKey, events]) => {
          const date = new Date(dateKey);
          return (
            <div key={dateKey} className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <div className="text-sm font-semibold text-gray-700">
                  {date.getDate()} {weekDays[date.getDay()]}
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {events.map(event => {
                  const visibility = getEventVisibility(event);
                  const displayTitle = visibility.type === 'busy' ? 'Horário ocupado' : event.title;
                  
                  // Determinar itens da copa
                  let copaItems = '';
                  if (visibility.type !== 'busy') {
                    if (event.water && event.coffee) {
                      copaItems = 'Água e café';
                    } else if (event.water) {
                      copaItems = 'Água';
                    } else if (event.coffee) {
                      copaItems = 'Café';
                    }
                  }
                  
                  // CORREÇÃO 2 & 3: Verificar status
                  const currentStatus = getEventStatus(event);
                  const isPendingInvite = currentStatus === 'PENDING' && event.organizer !== currentUser;
                  const isPendingEdit = currentStatus === 'PENDING_EDIT';
                  const isAccepted = currentStatus === 'ACCEPTED';
                  const isDeclined = currentStatus === 'DECLINED';
                  
                  return (
                    <div
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3"
                    >
                      <div 
                        className="w-1 h-16 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getRoomColor(event.room) }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{displayTitle}</span>
                          {/* CORREÇÃO 3: Badge de status */}
                          {isPendingEdit && (
                            <span className="px-2 py-0.5 bg-yellow-100 border border-yellow-300 rounded text-xs font-medium text-yellow-800">
                              Pendente de edição
                            </span>
                          )}
                          {!isPendingEdit && isPendingInvite && (
                            <span className="px-2 py-0.5 bg-yellow-100 border border-yellow-300 rounded text-xs font-medium text-yellow-800">
                              Pendente
                            </span>
                          )}
                          {isAccepted && (
                            <span className="px-2 py-0.5 bg-green-100 border border-green-300 rounded text-xs font-medium text-green-800 flex items-center gap-1">
                              <MaterialIcon name="check" size={12} />
                              Aceito
                            </span>
                          )}
                          {isDeclined && (
                            <span className="px-2 py-0.5 bg-red-100 border border-red-300 rounded text-xs font-medium text-red-800 flex items-center gap-1">
                              <MaterialIcon name="close" size={12} />
                              Recusado
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 space-y-0.5">
                          {/* CORREÇÃO 1: Material Icons */}
                          <div className="flex items-center gap-1">
                            <MaterialIcon name="schedule" size={12} />
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <MaterialIcon name="place" size={12} />
                            {event.room}
                          </div>
                          {visibility.type !== 'busy' && (
                            <div className="flex items-center gap-1">
                              <MaterialIcon name="people" size={12} />
                              {event.participants} participante{event.participants > 1 ? 's' : ''}
                            </div>
                          )}
                          {copaItems && (
                            <div className="flex items-center gap-1">
                              <MaterialIcon name="local_cafe" size={12} />
                              {copaItems}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header do Módulo */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Calendário / Agenda</h3>
        
        <div className="flex items-center gap-3">
          {/* Botão Criar Evento */}
          <button
            onClick={() => onCreateEvent()}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MaterialIcon name="add" size={16} />
            <span>Criar nova agenda</span>
          </button>
        </div>
      </div>

      {/* Controles principais */}
      <div className="space-y-4 mb-6">
        {/* Linha 1: Switch de perfil + Botões de sala */}
        <div className="flex items-center justify-between">
          {/* Switch Colaborador/Secretaria (estilo neutro) */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onAgendaViewModeChange('colaborador')}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                agendaViewMode === 'colaborador'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Visão Colaborador
            </button>
            <button
              onClick={() => onAgendaViewModeChange('secretaria')}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                agendaViewMode === 'secretaria'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Visão Secretaria
            </button>
          </div>

          {/* Botões de Seleção de Sala - MULTISELECT */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleRoomFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                selectedRoomFilters.includes('all')
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Todas as salas
            </button>
            {rooms.map(room => {
              const isSelected = selectedRoomFilters.includes(room.name);
              const roomId = getRoomIdFromName(room.name);
              const roomColor = roomId && roomColors[roomId] ? roomColors[roomId] : room.color;
              
              return (
                <button
                  key={room.id}
                  onClick={() => toggleRoomFilter(room.name)}
                  className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all font-medium ${
                    isSelected
                      ? 'border-gray-900 shadow-md scale-105'
                      : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                  }`}
                  style={{
                    backgroundColor: roomColor,
                    color: '#1F2937', // Texto sempre visível
                  }}
                  title={`${room.name} - ${isSelected ? 'Selecionada' : 'Clique para filtrar'}`}
                >
                  {room.name}
                </button>
              );
            })}
            
            {/* Botão de Configuração de Cores - CORREÇÃO 1: Material Icon */}
            {onOpenRoomColorConfig && (
              <button
                onClick={onOpenRoomColorConfig}
                className="p-2 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
                title="Configurar cores das salas"
              >
                <MaterialIcon name="settings" size={18} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Linha 2: Controle de mês + Visualizar por */}
        <div className="flex items-center justify-between">
          {/* Controle de Mês (sempre visível) - CORREÇÃO 1: Material Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MaterialIcon name="chevron-left" size={18} />
            </button>
            <div className="min-w-[200px] text-center">
              <span className="text-sm font-medium text-gray-900">
                {getDateTitle()}
              </span>
            </div>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MaterialIcon name="chevron-right" size={18} />
            </button>
          </div>

          {/* Select "Visualizar por" */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Visualizar por:</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as ViewMode)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="agenda">Agenda do Dia</option>
              <option value="semana">Semana</option>
              <option value="mes">Mês</option>
            </select>
            
            {/* Botão Imprimir - CORREÇÃO 1: Material Icon */}
            <button
              onClick={() => handlePrint('agenda')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MaterialIcon name="print" size={16} />
              <span>Imprimir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo do Calendário */}
      <div className="mt-4">
        {viewMode === 'agenda' && renderDayView()}
        {viewMode === 'semana' && renderWeekView()}
        {viewMode === 'mes' && renderMonthView()}
      </div>
    </div>
  );
};