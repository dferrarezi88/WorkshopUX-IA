import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Droplet, Coffee, AlertCircle, User, Edit } from 'lucide-react';
import { MaterialIcon } from './MaterialIcon';
import type { CalendarEvent } from '../App';

interface DrawerAgendamentoSecretariaProps {
  event: CalendarEvent | null;
  eventStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'PENDING_EDIT';
  onClose: () => void;
  isEventOrganizer?: boolean; // ALTERAÇÃO 5
  onEdit?: () => void; // ALTERAÇÃO 5: callback para abrir modal de edição
  onSendEditRequest?: (eventId: string, requestType: 'edit' | 'cancel') => void;
  isInvitePending?: boolean; // FEATURE 2: indica se é convite pendente
  onAcceptInvite?: () => void; // FEATURE 2: callback para aceitar convite
  onDeclineInvite?: () => void; // FEATURE 2: callback para recusar convite
  onRequestEdit?: (requestType: 'alteracao' | 'cancelamento', justification: string) => void; // Nova: callback para solicitar alteração
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
  onRequestEdit
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState<'edit' | 'cancel'>('edit');
  const [justification, setJustification] = useState('');
  const [requestError, setRequestError] = useState('');

  if (!event) return null;

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

  const handleSubmitRequest = () => {
    if (justification.trim().length < 10) return;
    onRequestEdit?.('alteracao', justification);
    setShowRequestModal(false);
    setJustification('');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const hasPendingEditRequest = eventStatus === 'PENDING_EDIT';
  const isCanceled = event.canceled === true || eventStatus === 'CANCELED';

  const handleRequestClick = () => {
    setRequestError('');
    setShowRequestModal(true);
  };

  const handleSendRequest = () => {
    if (justification.trim().length < 10) {
      setRequestError('A justificativa deve ter pelo menos 10 caracteres.');
      return;
    }

    onSendEditRequest?.(event.id, requestType);
    setShowRequestModal(false);
    setJustification('');
    setRequestError('');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Secretaria */}
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header do Drawer */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 pr-8">
              {event.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cancel Success Message - Estado Crítico */}
          {showCancelSuccess && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
              <div className="flex items-start gap-3 mb-2">
                <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-base font-bold text-red-900 mb-1">Agendamento Cancelado</p>
                  <p className="text-sm text-red-800">
                    O compromisso foi cancelado com sucesso e todos os participantes foram notificados por e-mail.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo do Drawer - Informações da Reunião */}
          <div className="space-y-6">
            {/* Data */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Data</div>
                <div className="font-medium text-gray-900 capitalize">
                  {formatDate(event.date)}
                </div>
              </div>
            </div>

            {/* Horário */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Horário</div>
                <div className="font-medium text-gray-900">
                  {event.startTime} - {event.endTime}
                </div>
              </div>
            </div>

            {/* Sala */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Sala</div>
                <div className="font-medium text-gray-900">{event.room}</div>
              </div>
            </div>

            {/* Responsável */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Responsável</div>
                <div className="font-medium text-gray-900">{event.organizer}</div>
              </div>
            </div>

            {/* Organizador */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-indigo-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Organizador</div>
                <div className="font-medium text-gray-900">{event.organizer}</div>
              </div>
            </div>

            {/* Participantes */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-teal-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Participantes</div>
                <div className="font-medium text-gray-900">{event.participants} pessoas</div>
              </div>
            </div>

            {/* Itens da Copa */}
            <div>
              <div className="text-sm text-gray-500 mb-3">Itens da Copa</div>
              <div className="flex flex-wrap gap-2">
                {event.water && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <Droplet size={18} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Água</span>
                  </div>
                )}
                {event.coffee && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <Coffee size={18} className="text-amber-600" />
                    <span className="text-sm font-medium text-amber-900">Café</span>
                  </div>
                )}
                {!event.water && !event.coffee && (
                  <span className="text-sm text-gray-500">Nenhum item solicitado</span>
                )}
              </div>
            </div>

            {/* Observações */}
            {event.notes && (
              <div>
                <div className="text-sm text-gray-500 mb-2">Observações</div>
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {event.notes}
                </div>
              </div>
            )}
          </div>

          {/* ÁREA DE AÇÕES DO DRAWER */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            {!isInvitePending && !isCanceled && (
              <div>
                <button
                  onClick={handleRequestClick}
                  disabled={hasPendingEditRequest}
                  className={`w-full px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${hasPendingEditRequest ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                >
                  <MaterialIcon name="edit_calendar" size={20} />
                  Solicitar alteração / cancelamento
                </button>
                {hasPendingEditRequest && (
                  <p className="mt-2 text-sm text-yellow-700">
                    Já existe uma solicitação pendente para esta reunião
                  </p>
                )}
              </div>
            )}

            {/* BOTÕES CONVITE PENDENTE - FEATURE 2 */}
            {isInvitePending && (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onAcceptInvite?.();
                    onClose();
                  }}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Aceitar
                </button>
                <button
                  onClick={() => {
                    onDeclineInvite?.();
                    onClose();
                  }}
                  className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Recusar
                </button>
              </div>
            )}

            {/* BOTÕES PARA SECRETARIA - SEM CONVITE PENDENTE */}
            {!isInvitePending && (
              <>
                {/* BOTÃO SOLICITAR ALTERAÇÃO/CANCELAMENTO */}
                {event.status !== 'pendente-edicao' && event.status !== 'cancelada' && onRequestEdit && (
                  <button
                    onClick={() => setShowRequestModal(true)}
                    className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <MaterialIcon name="edit_calendar" size={20} />
                    Solicitar alteração ou cancelamento
                  </button>
                )}

                {/* TEXTO QUANDO JÁ SOLICITADO */}
                {event.status === 'pendente-edicao' && (
                  <div className="w-full px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                    <p className="text-sm text-yellow-800 font-medium">
                      Solicitação já enviada. Aguardando ação do organizador.
                    </p>
                  </div>
                )}

                {/* BOTÃO EDITAR - ALTERAÇÃO 5 (apenas se for organizador) */}
                {isEventOrganizer && onEdit && (
                  <button
                    onClick={onEdit}
                    className="w-full px-4 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Edit size={20} />
                    Editar agendamento
                  </button>
                )}
                
                {/* BOTÃO CANCELAR AGENDAMENTO */}
                <button
                  onClick={handleCancel}
                  className="w-full px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <AlertCircle size={20} />
                  Cancelar agendamento
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Request Edit Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar alteração ou cancelamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Justificativa *
              </label>
              <Textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Descreva o motivo da necessidade da liberação da sala."
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 10 caracteres
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestModal(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitRequest}
              disabled={justification.trim().length < 10}
            >
              Enviar solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={24} className="text-red-600" />
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

      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="edit_calendar" size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Solicitar alteração ou cancelamento</h3>
                <p className="text-sm text-gray-600">
                  Você está solicitando ao organizador que realize uma alteração ou cancelamento desta reunião.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Tipo de solicitação</div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-blue-300">
                    <input
                      type="radio"
                      name="requestType"
                      value="edit"
                      checked={requestType === 'edit'}
                      onChange={() => setRequestType('edit')}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-800">Alteração de data/hora</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-blue-300">
                    <input
                      type="radio"
                      name="requestType"
                      value="cancel"
                      checked={requestType === 'cancel'}
                      onChange={() => setRequestType('cancel')}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-800">Cancelamento da reunião</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Justificativa *</label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Descreva o motivo da necessidade de liberação desta agenda..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                {requestError && (
                  <p className="mt-2 text-sm text-red-600">{requestError}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendRequest}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Enviar solicitação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Solicitação de Alteração / Cancelamento */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name="edit_calendar" size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Solicitar alteração ou cancelamento</h3>
                <p className="text-sm text-gray-600">
                  Você está solicitando ao organizador que realize uma alteração ou cancelamento desta reunião.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Tipo de solicitação</div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-blue-300">
                    <input
                      type="radio"
                      name="requestType"
                      value="edit"
                      checked={requestType === 'edit'}
                      onChange={() => setRequestType('edit')}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-800">Alteração de data/hora</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-blue-300">
                    <input
                      type="radio"
                      name="requestType"
                      value="cancel"
                      checked={requestType === 'cancel'}
                      onChange={() => setRequestType('cancel')}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-800">Cancelamento da reunião</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Justificativa *</label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Descreva o motivo da necessidade de liberação desta agenda..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                {requestError && (
                  <p className="mt-2 text-sm text-red-600">{requestError}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendRequest}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Enviar solicitação
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
