import React from 'react';
import { MaterialIcon } from './MaterialIcon'; // CORREÇÃO 1: Material Design icons
import type { User as UserType } from '../App';

interface HeaderProps {
  user: UserType;
  onOpenCustomize: () => void;
  emailSynced: boolean;
  onOpenTutorial: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onOpenCustomize,
  emailSynced,
  onOpenTutorial
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-700" style={{ backgroundColor: '#006ED8' }}>
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3 mr-6">
          <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">Workspace Gov</span>
        </div>

        {/* Search Bar - CORREÇÃO 1: Material Icon */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <MaterialIcon name="search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200" />
            <input
              type="text"
              placeholder="Buscar salas, compromissos ou pessoas"
              className="w-full pl-10 pr-4 py-2.5 bg-white/95 border border-blue-500 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          {/* Email Sync Status - CORREÇÃO 1: Material Icon */}
          {emailSynced && (
            <div className="flex items-center gap-2 px-3 py-2 bg-white/95 border border-white rounded-lg">
              <MaterialIcon name="email" size={18} className="text-green-600" />
              <span className="text-sm text-green-700 font-medium">E-mail sincronizado</span>
            </div>
          )}

          {/* Tutorial Button - CORREÇÃO 1: Material Icon */}
          <button
            onClick={onOpenTutorial}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            title="Iniciar tutorial"
          >
            <MaterialIcon name="info" size={20} />
          </button>

          {/* Customize Home Button - CORREÇÃO 1: Material Icon */}
          <button
            onClick={onOpenCustomize}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 text-white bg-white/10 border border-white/30 hover:bg-white/20"
          >
            <MaterialIcon name="settings" size={16} />
            Personalizar Home
          </button>

          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors">
            <MaterialIcon name="person" size={20} className="text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
};