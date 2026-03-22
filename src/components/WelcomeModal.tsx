import React, { useState } from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onComplete: (emailSynced: boolean) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onComplete }) => {
  const [showSyncFlow, setShowSyncFlow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSkip = () => {
    onComplete(false);
  };

  const handleStartSync = () => {
    setShowSyncFlow(true);
  };

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setSyncing(true);
    
    // Simulate sync process
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccess(true);
      
      // Auto close after success message
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }, 1500);
  };

  if (syncSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            E-mail sincronizado com sucesso!
          </h3>
          <p className="text-gray-600">
            Seus e-mails do Zimbra já estão disponíveis no Workspace.
          </p>
        </div>
      </div>
    );
  }

  if (showSyncFlow) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Sincronizar E-mail Zimbra</h2>
            <button
              onClick={() => setShowSyncFlow(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSync} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail institucional
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@instituicao.gov.br"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>Importante:</strong> Suas credenciais são criptografadas e usadas apenas para sincronização segura.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowSyncFlow(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={syncing}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {syncing ? 'Sincronizando...' : 'Sincronizar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Olá, bem-vindo ao Workspace
          </h2>
          <p className="text-gray-600 text-lg">
            Seu trabalho ficará todo organizado em um único espaço.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Mail size={18} className="text-blue-600" />
            Sincronize seu e-mail institucional
          </h3>
          <p className="text-sm text-gray-600">
            Integre seu e-mail Zimbra ao Workspace para centralizar todas as suas comunicações e aumentar sua produtividade.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleStartSync}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            Sincronizar agora
          </button>
          <button
            onClick={handleSkip}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Pular por enquanto
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Você pode sincronizar seu e-mail a qualquer momento através das configurações
        </p>
      </div>
    </div>
  );
};
