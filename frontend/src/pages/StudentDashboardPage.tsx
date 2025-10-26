import { useState, useEffect } from 'react';
import { DashboardCard } from '../components/common/DashboardCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getMinhasTurmas } from '../services/turmaService';
import { getAtividadesPendentes } from '../services/atividadeService';
import type { TurmaSummary } from '../types/turma.types';
import type { AtividadePendente } from '../types/atividade.types';
import { useAuthStore } from '../store/authStore'; 
import './StudentDashboardPage.css';

export const StudentDashboardPage = () => {
  const [turmas, setTurmas] = useState<TurmaSummary[]>([]);
  const [atividades, setAtividades] = useState<AtividadePendente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useAuthStore((state) => state.user); // <-- Lê o usuário da memória

  // Busca os dados (turmas E atividades) quando a página carrega
  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
      try {
        const [turmasData, atividadesData] = await Promise.all([
          getMinhasTurmas(),
          getAtividadesPendentes()
        ]);
        setTurmas(turmasData);
        setAtividades(atividadesData);
      } catch (error) {
        console.error("Erro ao carregar o dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    carregarDados();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Meu Painel</h1>
      {/* Mostra o nome vindo da memória */}
      <p className="dashboard-subtitle">
        Bem-vindo de volta, {user?.name || 'Aluno'}! Aqui está um resumo da sua semana.
      </p>

      <div className="dashboard-grid">
        {/* Coluna 1: Minhas Turmas */}
        <DashboardCard title="Minhas Turmas">
          {turmas.length > 0 ? (
            turmas.map(turma => (
              <div key={turma.id} className="item-card">
                <strong>{turma.name}</strong>
                <span>Prof. {turma.professorName}</span>
              </div>
            ))
          ) : (
            <p>Você não está matriculado em nenhuma turma.</p>
          )}
        </DashboardCard>

        {/* Coluna 2: Atividades Pendentes */}
        <DashboardCard title="Atividades Pendentes">
          {atividades.length > 0 ? (
            atividades.map(atv => (
              <div key={atv.activityId} className="item-card item-atividade">
                <strong>{atv.activityTitle}</strong>
                <span>Entrega: {new Date(atv.dueDate).toLocaleDateString('pt-BR')}</span>
              </div>
            ))
          ) : (
            <p>Você não tem nenhuma atividade pendente. Bom trabalho!</p>
          )}
        </DashboardCard>

        <DashboardCard title="Materiais recomendados">
    
            <p>Você não tem nenhuma recomendação. Bom trabalho!</p>
          
        </DashboardCard>
      </div>
    </div>
  );
};