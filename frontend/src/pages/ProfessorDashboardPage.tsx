import { useState, useEffect } from 'react';
import { DashboardCard } from '../components/common/DashboardCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getMinhasTurmasProfessor } from '../services/turmaService'; // Serviço do professor

// (Poderíamos adicionar um serviço para buscar atividades a avaliar aqui)
import type { TurmaSummary } from '../types/turma.types';
import { useAuthStore } from '../store/authStore';
// Reutiliza o CSS do dashboard do aluno por enquanto
import './StudentDashboardPage.css'; 

export const ProfessorDashboardPage = () => {
  const [turmas, setTurmas] = useState<TurmaSummary[]>([]);
  // const [atividadesParaAvaliar, setAtividadesParaAvaliar] = useState([]); // Futuro
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
      try {
        // Por enquanto, busca apenas as turmas
        const turmasData = await getMinhasTurmasProfessor();
        setTurmas(turmasData);
      } catch (error) {
        console.error("Erro ao carregar o dashboard do professor:", error);
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
      <h1 className="dashboard-title">Painel do Professor</h1>
      <p className="dashboard-subtitle">
        Bem-vindo(a), {user?.name}! Gerencie suas turmas e atividades.
      </p>

      <div className="dashboard-grid">
        {/* Coluna 1: Minhas Turmas */}
        <DashboardCard title="Turmas que Leciono">
          {turmas.length > 0 ? (
            turmas.map(turma => (
              // Poderia ser um link para a página de gerenciamento da turma
              <div key={turma.id} className="item-card">
                <strong>{turma.name}</strong>
                <span>{turma.courseTitle}</span>
              </div>
            ))
          ) : (
            <p>Você não está lecionando em nenhuma turma.</p>
          )}
        </DashboardCard>

        {/* Coluna 2: Atividades para Avaliar (Exemplo Futuro - RF013) */}
        <DashboardCard title="Atividades para Avaliar">
           <p>Nenhuma atividade pendente de avaliação no momento.</p>
           {/* Aqui entraria a lista de atividades pendentes */}
        </DashboardCard>
      </div>
    </div>
  );
};