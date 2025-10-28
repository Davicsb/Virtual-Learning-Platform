//adc
import { useState, useEffect } from 'react';
import { DashboardCard } from '../components/common/DashboardCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useAuthStore } from '../store/authStore';
import { getMeAluno } from '../services/Auth_Service';
import { getMinhasAtividadesAluno } from '../services/Atividade_Service';
import { mapTurmaToSummary } from '../services/Turma_Service';
import type { TurmaSummary } from '../types/turma.types';
import type { AlunoAssignment } from '../types/models';

import './StudentDashboardPage.css';

export const StudentDashboardPage = () => {
  const [turmas, setTurmas] = useState<TurmaSummary[]>([]);
  const [atividadesPendentes, setAtividadesPendentes] = useState<AlunoAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore((state) => state.user); // <-- Lê o usuário da memória

  // Busca os dados (turmas E atividades) quando a página carrega
  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
      try {
        const aluno = await getMeAluno();
        const turmasResumo = aluno.turmas?.map(mapTurmaToSummary) ?? [];
        setTurmas(turmasResumo);

        const entregas = await getMinhasAtividadesAluno(aluno.id);
        const pendentes = entregas.filter(e => !e.submitted);
        setAtividadesPendentes(pendentes);
      } catch (error) {
        console.error("Erro ao carregar o dashboard do aluno:", error);
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

        <DashboardCard title="Atividades Pendentes">
          {atividadesPendentes.length > 0 ? (
            atividadesPendentes.map(entrega => (
              <div key={entrega.id} className="item-card item-atividade">
                <strong>Atividade #{entrega.assignmentId}</strong>
                <span>Status: Pendente</span>
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