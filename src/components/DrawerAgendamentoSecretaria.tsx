import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';
import type { CalendarEvent } from '../App';

interface DrawerAgendamentoSecretariaProps {
  event: CalendarEvent | null;
  eventStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELED'| 'PENDING_EDIT';
  onClose: () => void;
  isEventOrganizer?: boolean;
  onEdit?: () => void;
  onSendEditRequest?: (eventId: string, requestType: 'edit' | 'cancel') => void;
  isInvitePending?: boolean;
  onAcceptInvite?: () => void;
  onDeclineInvite?: () => void;
}

export const DrawerAgendamentoSecretaria: React.FC<DrawerAgendamentoSecretariaProps> = ({
  event,
  eventStatus,
  onClose,
  isEventOrganizer = false,
  onEdit,
  onSendEditRequest,
  isInvitePending = false,
  onAcceptInvite,
  onDeclineInvite,
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [justification, setJustification] = useState('');
  const [requestError, setRequestError] = useState('');

  if (!event) return null;

  const handleCancel = () => setShowCancelConfirm(true);

  const confirmCancel = () => {
    setShowCancelConfirm(false);
    setShowCancelSuccess(true);
    setTimeout(() => { setShowCancelSuccess(false); onClose(); }, 3000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const hasPendingEditRequest = eventStatus === 'PENDING_EDIT';
  const isCanceled = eventStatus === 'CANCELED';

  const handleSendRequest = () => {
    if (justification.trim().length < 10) {
      setRequestError('A justificativa deve ter pelo menos 10 caracteres.');
      return;
    }
    onSendEditRequest?.(event.id, 'edit');
    setShowRequestModal(false);
    setJustification('');
    setRequestError('');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 pr-8">{event.title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="material-icons" style={{fontSize:'20px'}}>close</span>
            </button>
          </div>

          {showCancelSuccess && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="material-icons flex-shrink-0" style={{fontSize:'24px',color:'#dc2626'}}>error_outline</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-1">Agendamento Cancelado</p>
                  <p className="text-sm text-red-800">O compromisso foi cancelado e os participantes foram notificados.</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="material-icons" style={{fontSize:'20px',color:'#7c3aed'}}>calendar_today</span>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Data</div>
                <div className="font-medium text-gray-900 capitalize">{formatDate(event.date)}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="material-icons" style={{fontSize:'20px',color:'#16a34a'}}>schedule</span>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Horário</div>
                <div className="font-medium text-gray-900">{event.startTime} - {event.endTime}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <span className="material-icons" style={{fontSize:'20px',color:'#ea580c'}}>place</span>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Sala</div>
                <div className="font-medium text-gray-900">{event.room}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="material-icons" style={{fontSize:'20px',color:'#2563eb'}}>person</span>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Responsável</div>
                <div className="font-medium text-gray-900">{event.organizer}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="material-icons" style={{fontSize:'20px',color:'#0d9488'}}>group</span>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Participantes</div>
                <div className="font-medium text-gray-900">{event.participants} pessoas</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-3">Itens da Copa</div>
              <div className="flex flex-wrap gap-2">
                {event.water && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="material-icons" style={{fontSize:'18px',color:'#2563eb'}}>water_drop</span>
                    <span className="text-sm font-medium text-blue-900">Água</span>
                  </div>
                )}
                {event.coffee && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="material-icons" style={{fontSize:'18px',color:'#d97706'}}>coffee</span>
                    <span className="text-sm font-medium text-amber-900">Café</span>
                  </div>
                )}
                {!event.water && !event.coffee && (
                  <span className="text-sm text-gray-500">Nenhum item solicitado</span>
                )}
              </div>
            </div>

            {event.notes && (
              <div>
                <div className="text-sm text-gray-500 mb-2">Observações</div>
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">{event.notes}</div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            {!isInvitePending && !isCanceled && (
              <div>
                <button
                  onClick={() => { setRequestError(''); setShowRequestModal(true); }}
                  disabled={hasPendingEditRequest}
                  className={`w-full px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${hasPendingEditRequest ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                >
                  <MaterialIcon name="edit_calendar" size={20} />
                  Solicitar alteração ou cancelamento
                </button>
                {hasPendingEditRequest && (
                  <p className="mt-2 text-sm text-yellow-700">Já existe uma solicitação pendente para esta reunião</p>
                )}
              </div>
            )}

            {isInvitePending && (
              <div className="space-y-3">
                <button onClick={() => { onAcceptInvite?.(); onClose(); }}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Aceitar
                </button>
                <button onClick={() => { onDeclineInvite?.(); onClose(); }}
                  className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Recusar
                </button>
              </div>
            )}

            {!isInvitePending && (
              <>
                {isEventOrganizer && onEdit && (
                  <button onClick={onEdit}
                    className="w-full px-4 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-2">
                    <span className="material-icons" style={{fontSize:'20px'}}>edit</span>
                    Editar agendamento
                  </button>
                )}
                <button onClick={handleCancel}
                  className="w-full px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2">
                  <span className="material-icons" style={{fontSize:'20px'}}>error_outline</span>
                  Cancelar agendamento
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="material-icons" style={{fontSize:'24px',color:'#dc2626'}}>error_outline</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Cancelar Agendamento</h3>
                <p className="text-sm text-gray-600">Esta ação não pode ser desfeita.</p>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Motivo (opcional)</label>
              <textarea value={cancelMessage} onChange={(e) => setCancelMessage(e.target.value)}
                placeholder="Descreva o motivo do cancelamento..." rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Voltar
              </button>
              <button onClick={confirmCancel}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}

      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="edit_calendar" size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Solicitar alteração ou cancelamento</h3>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Justificativa *</label>
              <textarea value={justification} onChange={(e) => setJustification(e.target.value)}
                placeholder="Descreva o motivo da necessidade de liberação dessa agenda."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" />
              {requestError && <p className="mt-2 text-sm text-red-600">{requestError}</p>}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { setShowRequestModal(false); setRequestError(''); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Cancelar
              </button>
              <button onClick={handleSendRequest}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Enviar solicitação
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};