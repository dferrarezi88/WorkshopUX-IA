import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon'; // CORREÇÃO 1: Material Design icons

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  favoriteItems: string[];
  onToggleFavorite: (key: string) => void;
  onNavigateToEmail?: () => void;
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
  isFavorite?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, favoriteItems, onToggleFavorite, onNavigateToEmail }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['sub1', 'sub2', 'sub3', 'sub4']);
  const [activeKey, setActiveKey] = useState('1');

  // CORREÇÃO 1: Substituição por Material Icons
  const menuItems: MenuItem[] = [
    { key: '1', label: 'Home', icon: <MaterialIcon name="home" size={16} /> },
    { key: '2', label: 'Meu Workspace', icon: <MaterialIcon name="dashboard" size={16} /> },
    {
      key: 'sub1',
      label: 'Relatórios',
      icon: <MaterialIcon name="article" size={16} />,
      children: [
        { key: '3', label: 'Tableau', icon: <MaterialIcon name="dashboard" size={14} /> },
        { key: '4', label: 'Report Services', icon: <MaterialIcon name="description" size={14} /> },
        { key: '5', label: 'MicroStrategy', icon: <MaterialIcon name="article" size={14} /> },
      ],
    },
    {
      key: 'sub2',
      label: 'Documentos',
      icon: <MaterialIcon name="description" size={16} />,
      children: [
        { key: '6', label: 'Portal Único', icon: <MaterialIcon name="folder" size={14} /> },
        { key: '7', label: 'Intranet', icon: <MaterialIcon name="folder" size={14} /> },
      ],
    },
    {
      key: 'sub3',
      label: 'Links Úteis',
      icon: <MaterialIcon name="link" size={16} />,
      children: [
        { key: '8', label: 'Portais Externos', icon: <MaterialIcon name="link" size={14} /> },
      ],
    },
    {
      key: 'sub4',
      label: 'Colaboradores',
      icon: <MaterialIcon name="people" size={16} />,
      children: [
        { key: '9', label: 'Azure AD', icon: <MaterialIcon name="person" size={14} /> },
        { key: '10', label: 'Férias', icon: <MaterialIcon name="calendar" size={14} /> },
        { key: '11', label: 'Políticas', icon: <MaterialIcon name="description" size={14} /> },
        { key: '12', label: 'Consulta', icon: <MaterialIcon name="person" size={14} /> },
        { key: '13', label: 'Meet', icon: <MaterialIcon name="calendar" size={14} /> },
      ],
    },
    { key: '14', label: 'Configurações', icon: <MaterialIcon name="settings" size={16} /> },
    { key: 'email', label: 'E-mails', icon: <MaterialIcon name="email" size={16} /> },
  ];

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <div
      className="bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto shadow-sm h-full"
      style={{ width: collapsed ? '80px' : '260px' }}
    >
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="font-medium text-sm text-gray-700">Menu</div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"
        >
          {collapsed ? <MaterialIcon name="chevron-right" size={18} /> : <MaterialIcon name="chevron-left" size={18} />}
        </button>
      </div>

      <nav className="py-2">
        {menuItems.map(item => (
          <div key={item.key}>
            <button
              onClick={() => {
                if (item.key === 'email' && onNavigateToEmail) {
                  onNavigateToEmail();
                  setActiveKey(item.key);
                } else if (item.children) {
                  toggleMenu(item.key);
                } else {
                  setActiveKey(item.key);
                }
              }}
              className={`w-full flex items-center justify-between px-6 py-3 transition-colors text-gray-700 group ${
                activeKey === item.key 
                  ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-medium' 
                  : 'hover:bg-gray-100 border-l-4 border-transparent'
              }`}
              title={collapsed ? item.label : ''}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className={activeKey === item.key ? 'text-blue-600' : 'text-gray-600'}>
                  {item.icon}
                </span>
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </div>
              
              {!collapsed && (
                <div className="flex items-center gap-2">
                  {item.children && (
                    <MaterialIcon
                      name={expandedMenus.includes(item.key) ? 'expand-less' : 'expand-more'}
                      size={16}
                    />
                  )}
                  {!item.children && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.key);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded cursor-pointer"
                      title={favoriteItems.includes(item.key) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggleFavorite(item.key);
                        }
                      }}
                    >
                      <MaterialIcon
                        name={favoriteItems.includes(item.key) ? 'star' : 'star'}
                        size={16}
                        className={favoriteItems.includes(item.key) ? 'text-yellow-400' : 'text-gray-400'}
                      />
                    </div>
                  )}
                </div>
              )}
            </button>

            {!collapsed && item.children && expandedMenus.includes(item.key) && (
              <div className="bg-gray-50">
                {item.children.map(child => (
                  <button
                    key={child.key}
                    onClick={() => setActiveKey(child.key)}
                    className={`w-full flex items-center gap-3 px-6 pl-14 py-2.5 text-sm transition-colors text-gray-700 group ${
                      activeKey === child.key 
                        ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                        : 'hover:bg-gray-100 border-l-4 border-transparent'
                    }`}
                  >
                    <span className={activeKey === child.key ? 'text-blue-600' : 'text-gray-600'}>
                      {child.icon}
                    </span>
                    <span className="flex-1">{child.label}</span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(child.key);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded cursor-pointer"
                      title={favoriteItems.includes(child.key) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggleFavorite(child.key);
                        }
                      }}
                    >
                      <MaterialIcon
                        name="star"
                        size={14}
                        className={favoriteItems.includes(child.key) ? 'text-yellow-400' : 'text-gray-400'}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
