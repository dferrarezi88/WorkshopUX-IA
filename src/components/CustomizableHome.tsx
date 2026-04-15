import React, { useState } from 'react';
import { CalendarModule } from './CalendarModule';
import { NewsModule } from './NewsModule';
import { EmailsModule } from './EmailsModule';
import { ManagerialViewModule } from './ManagerialViewModule';
import type { User, ModuleConfig, CalendarEvent } from '../App';

interface CustomizableHomeProps {
  user: User;
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date?: Date) => void;
  modules: ModuleConfig[];
  agendaViewMode: 'colaborador' | 'secretaria';
  onAgendaViewModeChange: (mode: 'colaborador' | 'secretaria') => void;
  roomColors?: Record<string, string>; // ALTERAÇÃO 2
  onOpenRoomColorConfig?: () => void; // NOVA
  onAcceptInvite?: () => void; // CORREÇÃO 2: Agora sem parâmetro, usa evento selecionado
  onDeclineInvite?: () => void; // CORREÇÃO 2: Agora sem parâmetro, usa evento selecionado
  eventStatuses?: Record<string, 'PENDING' | 'ACCEPTED' | 'DECLINED'>; // Status dos eventos
  onNavigateToEmail?: () => void;
}

type ModuleId = 'calendar' | 'news' | 'emails' | 'managerial';

export const CustomizableHome: React.FC<CustomizableHomeProps> = ({
  user,
  onEventClick,
  onCreateEvent,
  modules,
  agendaViewMode,
  onAgendaViewModeChange,
  roomColors = {}, // ALTERAÇÃO 2
  onOpenRoomColorConfig, // NOVA
  onAcceptInvite, // CORREÇÃO 2
  onDeclineInvite, // CORREÇÃO 2
  eventStatuses = {}, // Status dos eventos
  onNavigateToEmail,
}) => {
  const [calendarExpanded, setCalendarExpanded] = useState(false);

  // Filter modules based on user profile
  const visibleModules = modules
    .filter(m => m.visible)
    .filter(m => !m.allowedProfiles || m.allowedProfiles.includes(user.profile))
    .sort((a, b) => a.order - b.order);

  const renderModule = (moduleId: ModuleId) => {
    const content = (() => {

      switch (moduleId) {
        case 'calendar':
          return (
            <CalendarModule
              expanded={calendarExpanded}
              onToggleExpand={() => setCalendarExpanded(!calendarExpanded)}
              onEventClick={onEventClick}
              onCreateEvent={onCreateEvent}
              userProfile={user.profile}
              agendaViewMode={agendaViewMode}
              onAgendaViewModeChange={onAgendaViewModeChange}
              roomColors={roomColors}
              onOpenRoomColorConfig={onOpenRoomColorConfig}
              eventStatuses={eventStatuses}
              currentUser={user.name}
            />
          );
        case 'news':
          return <NewsModule />;
        case 'emails':
          return <EmailsModule onNavigateToEmail={onNavigateToEmail} />;
        case 'managerial':
          return <ManagerialViewModule profile={user.profile} />;
        default:
          return null;
      }
    })();

    return <div key={moduleId}>{content}</div>;
  };

  return (
    <div className="space-y-6">
      {visibleModules.map((module) => renderModule(module.id as ModuleId))}
      
      {visibleModules.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            Nenhum módulo ativo. Use o botão "Personalizar Home" no header para adicionar módulos.
          </p>
        </div>
      )}
    </div>
  );
};