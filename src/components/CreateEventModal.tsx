import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, Droplet, Coffee, FileText, AlertCircle, Link as LinkIcon } from 'lucide-react';
import type { UserProfile } from '../App';

const ROOM_COLORS = [
  { id: 'blue',      hex: '#1890ff', label: 'Azul' },
  { id: 'cyan',      hex: '#13c2c2', label: 'Ciano' },
  { id: 'green',     hex: '#52c41a', label: 'Verde' },
  { id: 'lime',      hex: '#a0d911', label: 'Lima' },
  { id: 'yellow',    hex: '#fadb14', label: 'Amarelo' },
  { id: 'orange',    hex: '#fa8c16', label: 'Laranja' },
  { id: 'purple',    hex: '#722ed1', label: 'Roxo' },
  { id: 'magenta',   hex: '#eb2f96', label: 'Magenta' },
  { id: 'geekblue',  hex: '#2f54eb', label: 'Azul Escuro' },
  { id: 'volcano',   hex: '#fa541c', label: 'Vulcão' },
  { id: 'gold',      hex: '#faad14', label: 'Dourado' },
  { id: 'teal',      hex: '#08979c', label: 'Teal' },
];

const RoomColorPicker: React.FC<{
  selectedColor: string;
  usedColors: string[];
  onChange: (color: string) => void;
}> = ({ selectedColor, usedColors, onChange }) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span className="material-icons" style={{ fontSize: '14px' }}>palette</span>
        Escolha uma cor para esta sala
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', padding: '12px', background: '#fafafa', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
        {ROOM_COLORS.map((color) => {
          const isUsed = usedColors.includes(color.hex);
          const isSelected = selectedColor === color.hex;
          return (
            <button
              key={color.id}
              title={isUsed ? `${color.label} — já em uso` : color.label}
              disabled={isUsed}
              onClick={() => !isUsed && onChange(color.hex)}
              onMouseEnter={() => setHoveredId(color.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: color.hex,
                border: isSelected ? '3px solid #262626' : '2px solid transparent',
                cursor: isUsed ? 'not-allowed' : 'pointer',
                opacity: isUsed ? 0.25 : 1,
                transition: 'all 0.15s ease',
                transform: hoveredId === color.id && !isUsed ? 'scale(1.15)' : 'scale(1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                outline: isSelected ? '2px solid #ffffff' : 'none',
                outlineOffset: '-5px',
              }}
            >
              {isSelected && (
                <span className="material-icons" style={{ fontSize: '14px', color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  check
                </span>
              )}
            </button>
          );
        })}
      </div>
      {selectedColor && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '11px', color: '#595959' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: selectedColor, border: '1px solid rgba(0,0,0,0.1)' }} />
          {ROOM_COLORS.find(c => c.hex === selectedColor)?.label}
        </div>
      )}
      <div style={{ marginTop: '4px', fontSize: '11px', color: '#bfbfbf', display: 'flex', alignItems: 'center', gap: '3px' }}>
        <span className="material-icons" style={{ fontSize: '11px' }}>info</span>
        Cores acinzentadas já estão em uso. Vermelho reservado para o sistema.
      </div>
    </div>
  );
};

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate: Date | null;
  userProfile: UserProfile;
  userUnit?: string;
  roomColors?: Record<string, string>;
  onRoomColorChange?: (room: string, color: string) => void;
  onOpenRoomColorConfig?: () => void;
  onSuccess?: (message: string) => void; // FEATURE 1: callback para toast
}

interface Room {
  id: string;
  name: string;
  capacity: number;
  unit: string;
}

// Mock de salas vinculadas à unidade
const mockRooms: Room[] = [
  { id: '1', name: 'Sala 101', capacity: 10, unit: 'Coordenadoria A' },
  { id: '2', name: 'Sala 102', capacity: 15, unit: 'Coordenadoria A' },
  { id: '3', name: 'Sala 103', capacity: 8, unit: 'Coordenadoria A' },
  { id: '4', name: 'Sala 201', capacity: 20, unit: 'Coordenadoria B' },
  { id: '5', name: 'Sala 202', capacity: 12, unit: 'Coordenadoria B' },
  { id: '6', name: 'Auditório Principal', capacity: 50, unit: 'Secretaria' },
];

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ 
  isOpen, 
  onClose, 
  initialDate,
  userProfile,
  userUnit = 'Coordenadoria A',
  roomColors = {},
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    meetingType: 'presencial', // presencial, remota, hibrida
    title: '',
    local: '', // Campo LOCAL para presencial e híbrida
    room: '',
    meetingLink: '',
    externalAddress: '', // Endereço para reunião externa
    participants: '',
    date: initialDate ? initialDate.toISOString().split('T')[0] : '',
    startTime: '09:00',
    endTime: '10:00',
    water: false,
    coffee: false,
    additionalInfo: '', // Informações complementares (texto livre)
    notes: '',
    // FEATURE 3: Recorrência
    repeatType: 'nao-repetir', // nao-repetir, diario, semanal, quinzenal, mensal, anual, dias-uteis, personalizado
    repeatInterval: 1, // A cada X semanas/meses
    repeatWeekDays: [] as number[], // 0-6 (domingo-sábado)
    repeatMonthType: 'day', // day, weekday
    repeatMonthDay: 1, // Dia do mês
    repeatMonthWeekPosition: 'first', // first, second, third, fourth, last
    repeatMonthWeekDay: 0, // 0-6
    endType: 'never', // never, date, count
    endDate: '',
    endCount: 1,
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const [participantEmails, setParticipantEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');

  useEffect(() => {
    if (initialDate) {
      setFormData(prev => ({
        ...prev,
        date: initialDate.toISOString().split('T')[0]
      }));
    }
  }, [initialDate]);

  // Filtrar salas pela unidade do usuário
  const availableRooms = mockRooms.filter(room => {
    if (userProfile === 'admin') return true; // Admin vê todas
    return room.unit === userUnit;
  });

  const handleRoomChange = (roomId: string) => {
    const room = availableRooms.find(r => r.id === roomId);
    setSelectedRoom(room || null);
    
    // Se mudou para reunião externa, limpar infraestrutura
    if (roomId === 'externa') {
      setFormData({ 
        ...formData, 
        room: roomId,
        water: false,
        coffee: false
      });
    } else {
      // Se mudou de reunião externa para sala normal, limpar endereço
      setFormData({ 
        ...formData, 
        room: roomId,
        externalAddress: ''
      });
    }
    
    setValidationError('');
  };

  const handleParticipantsChange = (value: string) => {
    setFormData({ ...formData, participants: value });
    setValidationError('');

    const numParticipants = parseInt(value);
    
    if (numParticipants < 2 && numParticipants > 0) {
      setValidationError('Não é permitido reservar a sala para menos de duas pessoas, considere fazer uma videoconferência');
    } else if (selectedRoom && numParticipants > selectedRoom.capacity) {
      setValidationError(`A sala selecionada comporta no máximo ${selectedRoom.capacity} pessoas`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numParticipants = parseInt(formData.participants);

    // Validações
    if (numParticipants < 2) {
      setValidationError('Não é permitido reservar a sala para menos de duas pessoas, considere fazer uma videoconferência');
      return;
    }

    if (selectedRoom && numParticipants > selectedRoom.capacity) {
      setValidationError(`A sala selecionada comporta no máximo ${selectedRoom.capacity} pessoas`);
      return;
    }

    // Validar link da reunião para tipos remota e híbrida
    if ((formData.meetingType === 'remota' || formData.meetingType === 'hibrida') && !formData.meetingLink) {
      setValidationError('Link da reunião é obrigatório para reuniões remotas e híbridas');
      return;
    }

    // ALTERAÇÃO 4: Validar informações complementares para presencial e híbrida
    if ((formData.meetingType === 'presencial' || formData.meetingType === 'hibrida') && !formData.additionalInfo.trim()) {
      setValidationError('Informações complementares são obrigatórias para reuniões presenciais e híbridas');
      return;
    }

    // Aqui seria a lógica para criar o agendamento
    console.log('Criar agendamento:', {
      ...formData,
      participantEmails: participantEmails,
    });
    
    // FEATURE 1: Notificar sucesso via toast
    if (onSuccess) {
      onSuccess('Agendamento criado com sucesso!');
    }
    
    // Fechar modal
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      meetingType: 'presencial',
      title: '',
      local: '',
      room: '',
      meetingLink: '',
      externalAddress: '',
      participants: '',
      date: '',
      startTime: '09:00',
      endTime: '10:00',
      water: false,
      coffee: false,
      additionalInfo: '',
      notes: '',
      repeatType: 'nao-repetir',
      repeatInterval: 1,
      repeatWeekDays: [],
      repeatMonthType: 'day',
      repeatMonthDay: 1,
      repeatMonthWeekPosition: 'first',
      repeatMonthWeekDay: 0,
      endType: 'never',
      endDate: '',
      endCount: 1,
    });
    setSelectedRoom(null);
    setValidationError('');
    setParticipantEmails([]);
    setCurrentEmail('');
    onClose();
  };

  if (!isOpen) return null;

  // Determinar visibilidade dos campos baseado no tipo de reunião
  const showLocal = formData.meetingType === 'presencial' || formData.meetingType === 'hibrida'; // Alteração 1
  const showSala = formData.meetingType === 'presencial' || formData.meetingType === 'hibrida';
  const showLink = formData.meetingType === 'remota' || formData.meetingType === 'hibrida';
  
  // Verificar se é reunião externa
  const isReuniaoExterna = formData.room === 'externa';
  
  // Infraestrutura só aparece se for presencial E não for reunião externa
  const showInfraestrutura = formData.meetingType === 'presencial' && showSala && !isReuniaoExterna;
  
  // Endereço só aparece se sala = "Reunião Externa"
  const showEndereco = isReuniaoExterna;
  
  // Informações complementares (texto livre) aparece para Presencial OU Híbrida - Alteração 4
  const showAdditionalInfo = formData.meetingType === 'presencial' || formData.meetingType === 'hibrida';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Criar novo agendamento</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Success Message - Removido, agora usa toast */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">{/* 1. TIPO DE REUNIÃO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de reunião *
            </label>
            <select
              required
              value={formData.meetingType}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  meetingType: e.target.value,
                  local: '', // Limpar local ao trocar tipo
                  room: '', // Limpar sala ao trocar tipo
                  meetingLink: '', // Limpar link ao trocar tipo
                  externalAddress: '', // Limpar endereço ao trocar tipo
                  additionalInfo: '', // Limpar informações complementares
                  water: false, // Limpar infraestrutura
                  coffee: false,
                });
                setSelectedRoom(null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="presencial">Presencial</option>
              <option value="remota">Remota (Videoconferência)</option>
              <option value="hibrida">Híbrida</option>
            </select>
          </div>

          {/* 2. ASSUNTO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assunto *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Reunião de Planejamento"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 2.1. LOCAL (condicional - presencial ou híbrida) - ALTERAÇÃO 1 */}
          {showLocal && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Local
              </label>
              <input
                type="text"
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                placeholder="Digite o local da reunião"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* 3. SALA (condicional) */}
          {showSala && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  <MapPin size={16} className="inline mr-1" />
                  Sala
                </label>
              </div>
              <select
                value={formData.room}
                onChange={(e) => handleRoomChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma sala</option>
                {availableRooms.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {room.unit} (Capacidade: {room.capacity} pessoas)
                  </option>
                ))}
                <option value="externa">Reunião Externa</option>
              </select>
              {formData.room && (
                <RoomColorPicker
                  selectedColor={roomColors?.[formData.room] || ''}
                  usedColors={Object.entries(roomColors || {})
                    .filter(([room]) => room !== formData.room)
                    .map(([, color]) => color)
                  }
                  onChange={(color) => {
                    if (onRoomColorChange) {
                      onRoomColorChange(formData.room, color);
                    }
                  }}
                />
              )}
              {selectedRoom && (
                <p className="mt-2 text-sm text-blue-600 flex items-start gap-1">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  Atenção: a sala comporta no máximo {selectedRoom.capacity} pessoas
                </p>
              )}
            </div>
          )}

          {/* 3.1. ENDEREÇO (condicional - apenas reunião externa) */}
          {showEndereco && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Endereço
              </label>
              <input
                type="text"
                value={formData.externalAddress}
                onChange={(e) => setFormData({ ...formData, externalAddress: e.target.value })}
                placeholder="Digite o endereço completo da reunião externa"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* 3.2. INFORMAÇÕES COMPLEMENTARES (texto livre - presencial ou híbrida) - ALTERAÇÃO 4 */}
          {showAdditionalInfo && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="inline mr-1" />
                Informações complementares *
              </label>
              <textarea
                required
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Ex: necessidade de notebook, equipamentos, etc."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          )}

          {/* 4. LINK DA REUNIÃO (condicional) */}
          {showLink && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <LinkIcon size={16} className="inline mr-1" />
                Link da reunião *
              </label>
              <input
                type="url"
                required
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder="https://meet.google.com/abc-defg-hij"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* 5. ITENS DA COPA (condicional - apenas presencial) - ALTERAÇÃO 3: Renomeado */}
          {showInfraestrutura && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Itens da copa
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.water}
                    onChange={(e) => setFormData({ ...formData, water: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <Droplet size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Água</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.coffee}
                    onChange={(e) => setFormData({ ...formData, coffee: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
                  />
                  <Coffee size={20} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">Café</span>
                </label>
              </div>
            </div>
          )}

          {/* Participant Emails */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-1" />
              Participantes (emails)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (currentEmail && currentEmail.includes('@')) {
                        setParticipantEmails([...participantEmails, currentEmail]);
                        setCurrentEmail('');
                      }
                    }
                  }}
                  placeholder="Digite o email e pressione Enter"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (currentEmail && currentEmail.includes('@')) {
                      setParticipantEmails([...participantEmails, currentEmail]);
                      setCurrentEmail('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Adicionar
                </button>
              </div>
              {participantEmails.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {participantEmails.map((email, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setParticipantEmails(participantEmails.filter((_, i) => i !== idx));
                        }}
                        className="hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-1" />
              Número de participantes *
            </label>
            <input
              type="number"
              required
              min="2"
              max={selectedRoom?.capacity || 100}
              value={formData.participants}
              onChange={(e) => handleParticipantsChange(e.target.value)}
              placeholder="Mínimo 2 pessoas"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                validationError 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {validationError && (
              <p className="mt-2 text-sm text-red-600 flex items-start gap-1">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                {validationError}
              </p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Data *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-3 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-1" />
                Início *
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-3 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Término *
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* FEATURE 3: Recorrência */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repetir
            </label>
            <select
              value={formData.repeatType}
              onChange={(e) => setFormData({ ...formData, repeatType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="nao-repetir">Não repetir</option>
              <option value="diario">Diariamente</option>
              <option value="semanal">Semanalmente</option>
              <option value="quinzenal">Quinzenalmente</option>
              <option value="mensal">Mensalmente</option>
              <option value="anual">Anualmente</option>
              <option value="dias-uteis">Dias úteis (Segunda a Sexta)</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>

          {/* Configurações de recorrência - Exibidas condicionalmente */}
          {formData.repeatType !== 'nao-repetir' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {/* Semanal - Seleção de dias */}
              {formData.repeatType === 'semanal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repetir nos dias
                  </label>
                  <div className="flex gap-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          const days = formData.repeatWeekDays.includes(index)
                            ? formData.repeatWeekDays.filter(d => d !== index)
                            : [...formData.repeatWeekDays, index];
                          setFormData({ ...formData, repeatWeekDays: days });
                        }}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          formData.repeatWeekDays.includes(index)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      A cada quantas semanas?
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="52"
                      value={formData.repeatInterval}
                      onChange={(e) => setFormData({ ...formData, repeatInterval: parseInt(e.target.value) || 1 })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">semana(s)</span>
                  </div>
                </div>
              )}

              {/* Mensal */}
              {formData.repeatType === 'mensal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de repetição mensal
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="repeatMonthType"
                        value="day"
                        checked={formData.repeatMonthType === 'day'}
                        onChange={(e) => setFormData({ ...formData, repeatMonthType: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-sm">No dia</span>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={formData.repeatMonthDay}
                        onChange={(e) => setFormData({ ...formData, repeatMonthDay: parseInt(e.target.value) || 1 })}
                        className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">de cada mês</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="repeatMonthType"
                        value="weekday"
                        checked={formData.repeatMonthType === 'weekday'}
                        onChange={(e) => setFormData({ ...formData, repeatMonthType: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-sm">Na</span>
                      <select
                        value={formData.repeatMonthWeekPosition}
                        onChange={(e) => setFormData({ ...formData, repeatMonthWeekPosition: e.target.value })}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="first">primeira</option>
                        <option value="second">segunda</option>
                        <option value="third">terceira</option>
                        <option value="fourth">quarta</option>
                        <option value="last">última</option>
                      </select>
                      <select
                        value={formData.repeatMonthWeekDay}
                        onChange={(e) => setFormData({ ...formData, repeatMonthWeekDay: parseInt(e.target.value) })}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0">domingo</option>
                        <option value="1">segunda</option>
                        <option value="2">terça</option>
                        <option value="3">quarta</option>
                        <option value="4">quinta</option>
                        <option value="5">sexta</option>
                        <option value="6">sábado</option>
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {/* Término da recorrência */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Terminar
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="endType"
                      value="never"
                      checked={formData.endType === 'never'}
                      onChange={(e) => setFormData({ ...formData, endType: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-sm">Nunca</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="endType"
                      value="date"
                      checked={formData.endType === 'date'}
                      onChange={(e) => setFormData({ ...formData, endType: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-sm">Em</span>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={formData.endType !== 'date'}
                    />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="endType"
                      value="count"
                      checked={formData.endType === 'count'}
                      onChange={(e) => setFormData({ ...formData, endType: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-sm">Após</span>
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={formData.endCount}
                      onChange={(e) => setFormData({ ...formData, endCount: parseInt(e.target.value) || 1 })}
                      className="ml-2 w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={formData.endType !== 'count'}
                    />
                    <span className="ml-2 text-sm">ocorrência(s)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="inline mr-1" />
              Observações adicionais
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              placeholder="Adicione informações extras sobre o compromisso..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!!validationError}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Criar nova agenda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
