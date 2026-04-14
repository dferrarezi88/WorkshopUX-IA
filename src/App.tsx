import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CustomizableHome } from './components/CustomizableHome';
import { EmailPage } from './pages/EmailPage';
import { DrawerAgendamentoSecretaria } from './components/DrawerAgendamentoSecretaria';
import { DrawerAgendamentoColaborador } from './components/DrawerAgendamentoColaborador';
import { CreateEventModal } from './components/CreateEventModal';
import { WelcomeModal } from './components/WelcomeModal';
import { TutorialModal } from './components/TutorialModal';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { FavoriteCards, FavoriteItem } from './components/FavoriteCards';
import { StatusCards } from './components/StatusCards';
import { RoomColorConfig } from './components/RoomColorConfig'; // ALTERAÇÃO 2
import { ToastSystem, useToast } from './components/ToastSystem'; // FEATURE 1
import { MaterialIcon } from './components/MaterialIcon';

export type UserProfile = 'colaborador' | 'lider' | 'admin';

export interface User {
  name: string;
  profile: UserProfile;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  room: string;
  organizer: string;
  responsible?: string;
  participants: number;
  participantNames?: string[];
  water: boolean;
  coffee: boolean;
  notes?: string;
  isConcatenated?: boolean;
  originalEvents?: CalendarEvent[];
  inviteStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED'; // CORREÇÃO 2: status do convite
}

export interface ModuleConfig {
  id: string;
  title: string;
  visible: boolean;
  order: number;
  allowedProfiles?: UserProfile[];
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'email'>('home');
  const [user] = useState<User>({
    name: 'João Silva',
    profile: 'admin',
  });
  
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCustomizeDrawer, setShowCustomizeDrawer] = useState(false);
  const [agendaViewMode, setAgendaViewMode] = useState<'colaborador' | 'secretaria'>('colaborador');
  
  // FEATURE 1: Toast system
  const { toasts, showToast, dismissToast } = useToast();
  const [hasShownLoginToast, setHasShownLoginToast] = useState(false);
  
  // ALTERAÇÃO 2: State para cores das salas
  const [roomColors, setRoomColors] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('workspace_room_colors');
    return saved ? JSON.parse(saved) : {};
  });
  const [showRoomColorConfig, setShowRoomColorConfig] = useState(false);
  
  // ALTERAÇÃO 5: State para edição de evento
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // New states for welcome and tutorial
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    return localStorage.getItem('workspace_welcomed') !== 'true';
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [emailSynced, setEmailSynced] = useState(() => {
    return localStorage.getItem('workspace_email_synced') === 'true';
  });

  // Favorite items management
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>(() => {
    const saved = localStorage.getItem('workspace_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Menu items mapping
  const menuItemsMap: Record<string, { label: string; icon: React.ReactNode }> = {
    '1': { label: 'Home', icon: null },
    '2': { label: 'Meu Workspace', icon: null },
    '3': { label: 'Tableau', icon: null },
    '4': { label: 'Report Services', icon: null },
    '5': { label: 'MicroStrategy', icon: null },
    '6': { label: 'Portal Único', icon: null },
    '7': { label: 'Intranet', icon: null },
    '8': { label: 'Portais Externos', icon: null },
    '9': { label: 'Azure AD', icon: null },
    '10': { label: 'Férias', icon: null },
    '11': { label: 'Políticas', icon: null },
    '12': { label: 'Consulta', icon: null },
    '13': { label: 'Meet', icon: null },
    '14': { label: 'Configurações', icon: null },
  };

  // Modules configuration
  const getDefaultModules = (): ModuleConfig[] => [
    { id: 'calendar', title: 'Calendário / Agenda', visible: true, order: 0 },
    { id: 'news', title: 'Notícias', visible: true, order: 1 },
    { id: 'emails', title: 'E-mails', visible: true, order: 2 },
    { 
      id: 'managerial', 
      title: 'Visualização Gerencial', 
      visible: true, 
      order: 3,
      allowedProfiles: ['lider', 'admin']
    },
  ];

  const [modules, setModules] = useState<ModuleConfig[]>(() => {
    const saved = localStorage.getItem('workspace_modules');
    return saved ? JSON.parse(saved) : getDefaultModules();
  });

  const handleEventClick = (event: CalendarEvent) => {
    // Atualiza o evento com o status mais recente
    const updatedEvent = {
      ...event,
      inviteStatus: eventStatuses[event.id] || event.inviteStatus
    };
    setSelectedEvent(updatedEvent);
  };

  const handleCreateEvent = (date?: Date) => {
    setSelectedDate(date || new Date());
    setShowCreateModal(true);
  };

  const handleCloseDrawer = () => {
    setSelectedEvent(null);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setSelectedDate(null);
  };

  // ALTERAÇÃO 2: Handler para atualizar cor da sala
  const handleUpdateRoomColor = (roomId: string, color: string) => {
    const updatedColors = { ...roomColors, [roomId]: color };
    setRoomColors(updatedColors);
    localStorage.setItem('workspace_room_colors', JSON.stringify(updatedColors));
  };

  // ALTERAÇÃO 5: Handler para editar evento
  const handleEditEvent = () => {
    setEditingEvent(selectedEvent);
    setShowEditModal(true);
    setSelectedEvent(null); // Fecha o drawer
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingEvent(null);
  };

  const handleWelcomeComplete = (synced: boolean) => {
    localStorage.setItem('workspace_welcomed', 'true');
    if (synced) {
      setEmailSynced(true);
      localStorage.setItem('workspace_email_synced', 'true');
    }
    setShowWelcomeModal(false);
  };

  const handleToggleFavorite = (key: string) => {
    setFavoriteItems(prev => {
      const exists = prev.find(item => item.key === key);
      let newItems: FavoriteItem[];
      
      if (exists) {
        // Remove from favorites
        newItems = prev.filter(item => item.key !== key);
      } else {
        // Add to favorites
        const menuItem = menuItemsMap[key];
        if (menuItem) {
          newItems = [
            ...prev,
            {
              key,
              label: menuItem.label,
              icon: menuItem.icon,
              order: prev.length
            }
          ];
        } else {
          return prev;
        }
      }
      
      localStorage.setItem('workspace_favorites', JSON.stringify(newItems));
      return newItems;
    });
  };

  const handleRemoveFavorite = (key: string) => {
    setFavoriteItems(prev => {
      const newItems = prev.filter(item => item.key !== key);
      localStorage.setItem('workspace_favorites', JSON.stringify(newItems));
      return newItems;
    });
  };

  const handleReorderFavorites = (items: FavoriteItem[]) => {
    setFavoriteItems(items);
    localStorage.setItem('workspace_favorites', JSON.stringify(items));
  };

  const handleUpdateModules = (newModules: ModuleConfig[]) => {
    setModules(newModules);
  };

  // FEATURE 1: Mostrar toast de convite pendente ao "logar" (apenas uma vez por sessão)
  useEffect(() => {
    if (!hasShownLoginToast) {
      // Simular verificação de convites pendentes
      const hasPendingInvites = true; // Mock - substituir por lógica real
      
      if (hasPendingInvites) {
        setTimeout(() => {
          showToast({
            type: 'info',
            title: 'Você possui convite pendente',
            message: 'Existe uma agenda aguardando sua confirmação.',
            autoDismiss: true,
            duration: 4000,
          });
          setHasShownLoginToast(true);
        }, 1000); // 1s após "login"
      }
    }
  }, [hasShownLoginToast, showToast]);

  // CORREÇÃO 2: State para armazenar status dos eventos
  const [eventStatuses, setEventStatuses] = useState<Record<string, 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'PENDING_EDIT'>>({});

  const handleSendEditRequest = (eventId: string, requestType: 'edit' | 'cancel') => {
    setEventStatuses(prev => ({
      ...prev,
      [eventId]: 'PENDING_EDIT',
    }));

    showToast({
      type: 'success',
      title: 'Solicitação enviada ao organizador',
      message: 'Solicitação enviada ao organizador',
      autoDismiss: true,
      duration: 4000,
    });
  };

  // CORREÇÃO 2: Handlers para aceitar/recusar convite - ATUALIZA O STATUS
  const handleAcceptInvite = () => {
    if (!selectedEvent) return;
    
    console.log('Convite aceito:', selectedEvent.id);
    
    // Atualiza o status do evento
    setEventStatuses(prev => ({
      ...prev,
      [selectedEvent.id]: 'ACCEPTED'
    }));
    
    showToast({
      type: 'success',
      title: 'Convite aceito',
      message: 'Você confirmou presença na reunião.',
      autoDismiss: true,
      duration: 4000,
    });
    
    // Fecha o drawer
    setSelectedEvent(null);
  };

  const handleDeclineInvite = () => {
    if (!selectedEvent) return;
    
    console.log('Convite recusado:', selectedEvent.id);
    
    // Atualiza o status do evento
    setEventStatuses(prev => ({
      ...prev,
      [selectedEvent.id]: 'DECLINED'
    }));
    
    showToast({
      type: 'info',
      title: 'Convite recusado',
      message: 'Você recusou o convite para a reunião.',
      autoDismiss: true,
      duration: 4000,
    });
    
    // Fecha o drawer
    setSelectedEvent(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Full Width */}
      <Header 
        user={user} 
        onOpenCustomize={() => setShowCustomizeDrawer(true)}
        emailSynced={emailSynced}
        onOpenTutorial={() => setShowTutorial(true)}
      />
      
      {/* Content Area: Sidebar + Main */}
      <div className="flex flex-1">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          favoriteItems={favoriteItems.map(item => item.key)}
          onToggleFavorite={handleToggleFavorite}
          onNavigateToEmail={() => setCurrentPage('email')}
        />
        
        <div className="flex-1 flex flex-col">
          <FavoriteCards 
            items={favoriteItems}
            onRemove={handleRemoveFavorite}
            onReorder={handleReorderFavorites}
          />
          {currentPage === 'home' && <StatusCards />}
          
          {currentPage === 'email' ? (
            <div className="flex-1 overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>
              <EmailPage onBack={() => setCurrentPage('home')} />
            </div>
          ) : (
            <main className="flex-1 p-6">
              <CustomizableHome
                user={user}
                onEventClick={handleEventClick}
                onCreateEvent={handleCreateEvent}
                modules={modules}
                agendaViewMode={agendaViewMode}
                onAgendaViewModeChange={setAgendaViewMode}
                roomColors={roomColors}
                onOpenRoomColorConfig={() => setShowRoomColorConfig(true)}
                eventStatuses={eventStatuses}
                onNavigateToEmail={() => setCurrentPage('email')}
              />
            </main>
          )}
        </div>
      </div>

      {/* DRAWER CONDICIONAL - BASEADO NA VISÃO DA AGENDA */}
      {agendaViewMode === 'secretaria' ? (
        <DrawerAgendamentoSecretaria 
          event={selectedEvent}
          eventStatus={selectedEvent ? eventStatuses[selectedEvent.id] : undefined}
          onClose={handleCloseDrawer}
          isEventOrganizer={selectedEvent?.organizer === user.name}
          onEdit={handleEditEvent}
          onSendEditRequest={handleSendEditRequest}
          isInvitePending={selectedEvent?.inviteStatus === 'PENDING' && selectedEvent?.organizer !== user.name}
          onAcceptInvite={handleAcceptInvite}
          onDeclineInvite={handleDeclineInvite}
        />
      ) : (
        <DrawerAgendamentoColaborador 
          event={selectedEvent}
          onClose={handleCloseDrawer}
          isEventOrganizer={selectedEvent?.organizer === user.name}
          onEdit={handleEditEvent}
          isInvitePending={selectedEvent?.inviteStatus === 'PENDING' && selectedEvent?.organizer !== user.name}
          onAcceptInvite={handleAcceptInvite}
          onDeclineInvite={handleDeclineInvite}
        />
      )}

      {/* MODAL CRIAR NOVO AGENDAMENTO */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        initialDate={selectedDate}
        userProfile={user.profile}
        roomColors={roomColors}
        onOpenRoomColorConfig={() => setShowRoomColorConfig(true)}
        onSuccess={(message) => {
          showToast({
            type: 'success',
            title: 'Sucesso',
            message,
            autoDismiss: true,
            duration: 4000,
          });
        }}
      />

      {/* MODAL EDITAR AGENDAMENTO - ALTERAÇÃO 5 */}
      <CreateEventModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        initialDate={editingEvent?.start || null}
        userProfile={user.profile}
        roomColors={roomColors}
        onOpenRoomColorConfig={() => setShowRoomColorConfig(true)}
        onSuccess={(message) => {
          showToast({
            type: 'success',
            title: 'Sucesso',
            message,
            autoDismiss: true,
            duration: 4000,
          });
        }}
      />

      <WelcomeModal
        isOpen={showWelcomeModal}
        onComplete={handleWelcomeComplete}
      />

      <TutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      <CustomizeDrawer
        isOpen={showCustomizeDrawer}
        onClose={() => setShowCustomizeDrawer(false)}
        modules={modules}
        onUpdateModules={handleUpdateModules}
        userProfile={user.profile}
      />

      {/* MODAL CONFIGURAÇÃO DE CORES DAS SALAS - ALTERAÇÃO 2 */}
      <RoomColorConfig
        isOpen={showRoomColorConfig}
        onClose={() => setShowRoomColorConfig(false)}
        rooms={[
          { id: '1', name: 'Sala 101', capacity: 10, unit: 'Coordenadoria A' },
          { id: '2', name: 'Sala 102', capacity: 15, unit: 'Coordenadoria A' },
          { id: '3', name: 'Sala 103', capacity: 8, unit: 'Coordenadoria A' },
          { id: '4', name: 'Sala 201', capacity: 20, unit: 'Coordenadoria B' },
          { id: '5', name: 'Sala 202', capacity: 12, unit: 'Coordenadoria B' },
          { id: '6', name: 'Auditório Principal', capacity: 50, unit: 'Secretaria' },
        ]}
        roomColors={roomColors}
        onUpdateRoomColor={handleUpdateRoomColor}
      />

      {/* FEATURE 1: Toast System */}
      <ToastSystem toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;