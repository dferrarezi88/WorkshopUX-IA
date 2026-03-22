import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Activity, Briefcase, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../App';

interface ManagerialViewModuleProps {
  profile: UserProfile;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  system: string;
  status: string;
  statusColor: string;
}

export const ManagerialViewModule: React.FC<ManagerialViewModuleProps> = ({ profile }) => {
  const [selectedProfile, setSelectedProfile] = useState<'gestor' | 'lider' | 'admin'>('admin');

  const getStatsForProfile = (profileType: 'gestor' | 'lider' | 'admin') => {
    const statsData = {
      gestor: [
        { title: 'Projetos Ativos', value: '12', change: '+2', trend: 'up', icon: Activity, color: 'blue' },
        { title: 'Colaboradores', value: '45', subtitle: 'de 50', trend: 'up', icon: Users, color: 'green' },
        { title: 'Entregas no Prazo', value: '92%', change: '+3%', trend: 'up', icon: CheckCircle, color: 'emerald' },
        { title: 'Alertas', value: '3', change: '-1', trend: 'down', icon: AlertCircle, color: 'red' },
      ],
      lider: [
        { title: 'Tarefas da Equipe', value: '34', change: '+5', trend: 'up', icon: Activity, color: 'blue' },
        { title: 'Membros Online', value: '8', subtitle: 'de 10', trend: 'up', icon: Users, color: 'green' },
        { title: 'Concluídas Hoje', value: '85%', change: '+8%', trend: 'up', icon: CheckCircle, color: 'emerald' },
        { title: 'Pendências', value: '5', change: '0', trend: 'up', icon: AlertCircle, color: 'red' },
      ],
      admin: [
        { title: 'Projetos Ativos', value: '23', change: '+3', trend: 'up', icon: Activity, color: 'blue' },
        { title: 'Colaboradores Online', value: '142', subtitle: 'de 180', trend: 'up', icon: Users, color: 'green' },
        { title: 'Tarefas Concluídas', value: '87%', change: '+5%', trend: 'up', icon: CheckCircle, color: 'emerald' },
        { title: 'Alertas Críticos', value: '7', change: '-2', trend: 'down', icon: AlertCircle, color: 'red' },
      ],
    };
    return statsData[profileType];
  };

  const getTeamMembersForProfile = (profileType: 'gestor' | 'lider' | 'admin'): TeamMember[] => {
    const teamsData = {
      gestor: [
        { id: '1', name: 'Ana Silva', role: 'Desenvolvedora Sênior', system: 'Portal Gov', status: 'Em andamento', statusColor: 'blue' },
        { id: '2', name: 'Carlos Souza', role: 'Designer UX', system: 'App Mobile', status: 'Concluído', statusColor: 'green' },
        { id: '3', name: 'Maria Santos', role: 'Analista de Dados', system: 'BI Analytics', status: 'Pendente', statusColor: 'yellow' },
        { id: '4', name: 'Pedro Lima', role: 'DevOps', system: 'Infraestrutura', status: 'Em revisão', statusColor: 'purple' },
      ],
      lider: [
        { id: '1', name: 'João Alves', role: 'Desenvolvedor Júnior', system: 'API Gateway', status: 'Em andamento', statusColor: 'blue' },
        { id: '2', name: 'Juliana Costa', role: 'QA Tester', system: 'Testing Suite', status: 'Concluído', statusColor: 'green' },
        { id: '3', name: 'Rafael Ferreira', role: 'Frontend Dev', system: 'Dashboard', status: 'Atrasado', statusColor: 'red' },
      ],
      admin: [
        { id: '1', name: 'Fernanda Oliveira', role: 'Tech Lead', system: 'Plataforma Central', status: 'Em andamento', statusColor: 'blue' },
        { id: '2', name: 'Lucas Martins', role: 'Arquiteto de Software', system: 'Microservices', status: 'Concluído', statusColor: 'green' },
        { id: '3', name: 'Beatriz Rocha', role: 'Product Owner', system: 'Roadmap 2026', status: 'Planejamento', statusColor: 'purple' },
        { id: '4', name: 'Roberto Dias', role: 'Scrum Master', system: 'Ágil Gov', status: 'Em andamento', statusColor: 'blue' },
        { id: '5', name: 'Camila Reis', role: 'Data Scientist', system: 'ML Pipeline', status: 'Concluído', statusColor: 'green' },
      ],
    };
    return teamsData[profileType];
  };

  const stats = getStatsForProfile(selectedProfile);
  const teamMembers = getTeamMembersForProfile(selectedProfile);

  const getProfileTitle = (profileType: 'gestor' | 'lider' | 'admin') => {
    const titles = {
      gestor: 'Visão Gerencial - Gestor',
      lider: 'Visão da Equipe - Líder',
      admin: 'Visão Gerencial - Admin',
    };
    return titles[profileType];
  };

  const recentActivities = [
    { id: '1', text: 'Projeto Alpha concluiu milestone 3', time: '15 min atrás', type: 'success' },
    { id: '2', text: 'Reunião com stakeholders agendada', time: '1 hora atrás', type: 'info' },
    { id: '3', text: 'Alerta: Prazo próximo para entrega Beta', time: '2 horas atrás', type: 'warning' },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; icon: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-900', icon: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-900', icon: 'text-green-600' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-900', icon: 'text-emerald-600' },
      red: { bg: 'bg-red-50', text: 'text-red-900', icon: 'text-red-600' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Module Header */}
      <div className="border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">
          {getProfileTitle(selectedProfile)}
        </h2>
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value as 'gestor' | 'lider' | 'admin')}
            className="px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="gestor">Gestor</option>
            <option value="lider">Líder</option>
            <option value="admin">Admin</option>
          </select>
          
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Ver todos
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {stats.map((stat, index) => {
            const colorClasses = getColorClasses(stat.color);
            const Icon = stat.icon;
            
            return (
              <div key={index} className={`p-4 rounded-lg ${colorClasses.bg} border border-gray-200`}>
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded ${colorClasses.icon}`} style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                    <Icon size={18} className={colorClasses.icon} />
                  </div>
                  {stat.change && (
                    <div className={`flex items-center gap-0.5 text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {stat.change}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600 mb-1.5">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.subtitle && <span className="text-xs text-gray-500 font-normal ml-1">{stat.subtitle}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activities and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
          {/* Recent Activities */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 text-sm flex items-center gap-2">
              <Activity size={16} className="text-blue-600" />
              Atividades Recentes
            </h3>
            <div className="space-y-2.5">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex gap-2.5 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Chart Placeholder */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 text-sm flex items-center gap-2">
              <BarChart3 size={16} className="text-green-600" />
              Performance da Semana
            </h3>
            <div className="h-32 bg-green-50 rounded flex items-center justify-center">
              <div className="text-center text-gray-400">
                <BarChart3 size={32} className="mx-auto mb-1 text-green-300" />
                <p className="text-xs">Gráfico de performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 text-sm flex items-center gap-2">
              <Briefcase size={16} className="text-gray-700" />
              Colaboradores
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Nome</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Perfil / Função</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Sistema</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-gray-900">{member.name}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{member.role}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{member.system}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                        member.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                        member.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                        member.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                        member.statusColor === 'red' ? 'bg-red-100 text-red-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
