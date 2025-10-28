//adc
import { useState, useEffect } from 'react';
import { DashboardCard } from '../components/common/DashboardCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getMeProfessor } from '../services/Auth_Service';
import { mapTurmaToSummary } from '../services/Turma_Service';
import type { TurmaSummary } from '../types/turma.types';
import { useAuthStore } from '../store/authStore';
import './StudentDashboardPage.css';

export const ProfessorDashboardPage = () => {
  const [turmas, setTurmas] = useState<TurmaSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
      try {
        const professor = await getMeProfessor();
        const turmasResumo = professor.turmas?.map(mapTurmaToSummary) ?? [];
        setTurmas(turmasResumo);
      } catch (error) {
        console.error("Erro ao carregar o dashboard do professor:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Painel do Professor</h1>
      <p className="dashboard-subtitle">
        Bem-vindo(a), {user?.name}! Gerencie suas turmas e atividades.
      </p>

      <div className="dashboard-grid">
        {/* Coluna 1: Minhas Turmas */}
        <DashboardCard title="Turmas que Leciono">
          {hasError ? (
            <p className="turmas-error-message">
              Ocorreu um erro ao carregar suas turmas. Tente novamente mais tarde.
            </p>
          ) : turmas.length > 0 ? (
            turmas.map(turma => (
              <div key={turma.id} className="item-card">
                <strong>{turma.name}</strong>
                <span>{turma.courseTitle}</span>
              </div>
            ))
          ) : (
            <p className="turmas-empty-message">
              Você não está lecionando em nenhuma turma.
            </p>
          )}
        </DashboardCard>

        {/* Coluna 2: Atividades para Avaliar (Exemplo Futuro - RF013) */}
        <DashboardCard title="Atividades para Avaliar">
          <p>Nenhuma atividade pendente de avaliação no momento.</p>
        </DashboardCard>
      </div>
    </div>
  );
};
