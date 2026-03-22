import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon'; // CORREÇÃO 1: Material Design icons
import type { CalendarEvent } from '../App';

interface DrawerAgendamentoColaboradorProps {
  event: CalendarEvent | null;
  onClose: () => void;
  isEventOrganizer?: boolean;
  onEdit?: () => void; // ALTERAÇÃO 5: callback para abrir modal de edição
  isInvitePending?: boolean; // FEATURE 2: indica se é convite pendente
  onAcceptInvite?: () => void; // FEATURE 2: callback para aceitar convite
  onDeclineInvite?: () => void; // FEATURE 2: callback para recusar convite
}

export const DrawerAgendamentoColaborador: React.FC<DrawerAgendamentoColaboradorProps> = ({ 
  event, 
  onClose,
  isEventOrganizer = false,
  onEdit,
  isInvitePending = false,
  onAcceptInvite,
  onDeclineInvite
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);

  if (!event) return null;

  // Colaborador pode ver detalhes completos se for organizador
  const canSeeFullDetails = isEventOrganizer;
  
  // Colaborador pode cancelar apenas se for o criador da reunião
  const canCancelEvent = isEventOrganizer;

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    console.log('Agendamento cancelado:', event.id);
    console.log('Motivo:', cancelMessage);
    setShowCancelConfirm(false);
    setShowCancelSuccess(true);
    setTimeout(() => {
      setShowCancelSuccess(false);
      onClose();
    }, 3000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Colaborador - APENAS INFORMATIVO */}
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header do Drawer */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 pr-8">
              {canSeeFullDetails ? event.title : 'Ocupado'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MaterialIcon name="close" size={20} />
            </button>
          </div>

          {/* Cancel Success Message - Estado Crítico */}
          {showCancelSuccess && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
              <div className="flex items-start gap-3 mb-2">
                <MaterialIcon name="error" size={24} className="text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-base font-bold text-red-900 mb-1">Agendamento Cancelado</p>
                  <p className="text-sm text-red-800">
                    O compromisso foi cancelado com sucesso e todos os participantes foram notificados por e-mail.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo do Drawer */}
          <div className="space-y-6">
            {/* Data - CORREÇÃO 1: Material Icon */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="calendar" size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Data</div>
                <div className="font-medium text-gray-900 capitalize">
                  {formatDate(event.date)}
                </div>
              </div>
            </div>

            {/* Horário - CORREÇÃO 1: Material Icon */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="schedule" size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Horário</div>
                <div className="font-medium text-gray-900">
                  {event.startTime} - {event.endTime}
                </div>
              </div>
            </div>

            {/* Sala - CORREÇÃO 1: Material Icon */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="place" size={20} className="text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Sala</div>
                <div className="font-medium text-gray-900">{event.room}</div>
              </div>
            </div>

            {/* Responsável - CORREÇÃO 1: Material Icon */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="person" size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Responsável</div>
                <div className="font-medium text-gray-900">{event.organizer}</div>
              </div>
            </div>

            {/* Mensagem informativa para colaboradores sem detalhes completos */}
            {!canSeeFullDetails && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-6">
                <p className="text-sm text-gray-600">
                  Esta sala está ocupada durante todo o intervalo de horário indicado.
                </p>
              </div>
            )}
          </div>

          {/* ÁREA DE AÇÕES DO DRAWER */}
          {(canCancelEvent || isInvitePending) && (
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              {/* BOTÕES CONVITE PENDENTE - FEATURE 2 */}
              {isInvitePending && (
                <div className="space-y-3">
                  <button
                    onClick={() => onAcceptInvite?.()}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <MaterialIcon name="check" size={20} />
                    Aceitar Participação
                  </button>
                  <button
                    onClick={() => onDeclineInvite?.()}
                    className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <MaterialIcon name="close" size={20} />
                    Recusar Participação
                  </button>
                </div>
              )}

              {/* BOTÕES PARA CRIADOR - ALTERAÇÃO 5 */}
              {canCancelEvent && !isInvitePending && (
                <>
                  {onEdit && (
                    <button
                      onClick={onEdit}
                      className="w-full px-4 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <MaterialIcon name="edit" size={20} />
                      Editar agendamento
                    </button>
                  )}
                  
                  <button
                    onClick={handleCancel}
                    className="w-full px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <MaterialIcon name="cancel" size={20} />
                    Cancelar agendamento
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="error" size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Cancelar Agendamento</h3>
                <p className="text-sm text-gray-600">
                  Esta ação não pode ser desfeita. Todos os participantes serão notificados por e-mail.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo do cancelamento (opcional)
              </label>
              <textarea
                value={cancelMessage}
                onChange={(e) => setCancelMessage(e.target.value)}
                placeholder="Descreva o motivo do cancelamento..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Voltar
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
