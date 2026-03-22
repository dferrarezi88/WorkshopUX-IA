import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Calendar, Mail, Newspaper, BarChart3 } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Bem-vindo ao Workspace',
    description: 'Vamos fazer um tour rápido pelas principais funcionalidades da plataforma.',
    icon: Calendar,
  },
  {
    title: 'Calendário e Agenda',
    description: 'Gerencie seus compromissos, reserve salas e visualize sua agenda de forma intuitiva. Você pode expandir o calendário para uma visão completa ou mantê-lo compacto na Home.',
    icon: Calendar,
  },
  {
    title: 'E-mails Integrados',
    description: 'Sincronize seu e-mail Zimbra institucional e acesse suas mensagens diretamente no Workspace, sem precisar trocar de aplicativo.',
    icon: Mail,
  },
  {
    title: 'Notícias e Comunicados',
    description: 'Fique atualizado com as últimas notícias e comunicados importantes da organização em um único lugar.',
    icon: Newspaper,
  },
  {
    title: 'Personalização da Home',
    description: 'Organize sua Home do seu jeito! Use o botão "Personalizar Home" para reorganizar módulos, mostrar ou ocultar informações conforme sua necessidade.',
    icon: BarChart3,
  },
];

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Tutorial do Workspace</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon size={40} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              {step.description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Anterior
            </button>

            <span className="text-sm text-gray-500">
              {currentStep + 1} de {tutorialSteps.length}
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                'Concluir'
              ) : (
                <>
                  Próximo
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
