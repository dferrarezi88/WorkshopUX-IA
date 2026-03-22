import React, { useState, useEffect } from 'react';
import { X, GripVertical, Eye, EyeOff } from 'lucide-react';
import type { ModuleConfig, UserProfile } from '../App';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  modules: ModuleConfig[];
  onUpdateModules: (modules: ModuleConfig[]) => void;
  userProfile: UserProfile;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  modules,
  onUpdateModules,
  userProfile,
}) => {
  const [localModules, setLocalModules] = useState<ModuleConfig[]>(modules);
  const [draggedModule, setDraggedModule] = useState<string | null>(null);
  const [dragOverModule, setDragOverModule] = useState<string | null>(null);

  useEffect(() => {
    setLocalModules(modules);
  }, [modules]);

  const toggleModuleVisibility = (id: string) => {
    setLocalModules(localModules.map(m => 
      m.id === id ? { ...m, visible: !m.visible } : m
    ));
  };

  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    setDraggedModule(moduleId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, moduleId: string) => {
    e.preventDefault();
    if (draggedModule && draggedModule !== moduleId) {
      setDragOverModule(moduleId);
    }
  };

  const handleDragLeave = () => {
    setDragOverModule(null);
  };

  const handleDrop = (e: React.DragEvent, targetModuleId: string) => {
    e.preventDefault();
    
    if (!draggedModule || draggedModule === targetModuleId) {
      setDraggedModule(null);
      setDragOverModule(null);
      return;
    }

    const draggedIndex = localModules.findIndex(m => m.id === draggedModule);
    const targetIndex = localModules.findIndex(m => m.id === targetModuleId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newModules = [...localModules];
    const draggedItem = newModules[draggedIndex];
    const targetItem = newModules[targetIndex];

    // Swap orders
    const tempOrder = draggedItem.order;
    draggedItem.order = targetItem.order;
    targetItem.order = tempOrder;

    setLocalModules(newModules);
    setDraggedModule(null);
    setDragOverModule(null);
  };

  const handleApply = () => {
    onUpdateModules(localModules);
    localStorage.setItem('workspace_modules', JSON.stringify(localModules));
    onClose();
  };

  const filteredModules = localModules
    .filter(m => !m.allowedProfiles || m.allowedProfiles.includes(userProfile))
    .sort((a, b) => a.order - b.order);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#006ED8' }}>
          <h2 className="text-lg font-semibold text-white">Personalizar Home</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-gray-600 mb-6">
            Personalize a ordem e visibilidade dos módulos na sua Home. Arraste para reordenar e clique para ocultar/exibir.
          </p>

          <div className="space-y-3">
            {filteredModules.map((module) => {
              const isDragging = draggedModule === module.id;
              const isDragOver = dragOverModule === module.id;

              return (
                <div
                  key={module.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, module.id)}
                  onDragOver={(e) => handleDragOver(e, module.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, module.id)}
                  className={`relative flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-move ${
                    module.visible
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } ${
                    isDragging ? 'opacity-50 scale-95' : ''
                  } ${
                    isDragOver ? 'transform -translate-y-2 shadow-lg' : ''
                  }`}
                >
                  <div className="text-gray-500">
                    <GripVertical size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <span className={`font-medium ${
                      module.visible ? 'text-blue-900' : 'text-gray-700'
                    }`}>
                      {module.title}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModuleVisibility(module.id);
                    }}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    {module.visible ? (
                      <Eye size={20} className="text-blue-600" />
                    ) : (
                      <EyeOff size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
