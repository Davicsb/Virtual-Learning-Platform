//adc
// src/pages/GerenciarTurmasPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { TurmaCard } from '../components/common/TurmaCard';
import { Button } from '../components/common/Button';
import { getMeProfessor } from '../services/Auth_Service';
import { mapTurmaToSummary } from '../services/Turma_Service';
import type { TurmaSummary } from '../types/turma.types';
import './GerenciarTurmasPage.css';

export const GerenciarTurmasPage = () => {
  const [turmas, setTurmas] = useState<TurmaSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMeProfessor()
      .then(professor => {
        const turmasResumo = professor.turmas?.map(mapTurmaToSummary) ?? [];
        setTurmas(turmasResumo);
      })
      .catch(err => {
        console.error('Erro ao buscar turmas do professor:', err);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleCriarTurma = () => {
    navigate('/app/criar-turma');
  };

  return (
    <div className="manage-turmas-container">
      <div className="manage-turmas-header">
        <div>
          <h1 className="manage-turmas-title">Gerenciar Turmas</h1>
          <p className="manage-turmas-subtitle">
            Crie novas turmas ou acesse as existentes para adicionar conteúdo e alunos.
          </p>
        </div>
        <Button variant="primary" onClick={handleCriarTurma}>
          + Criar Nova Turma
        </Button>
      </div>

      <section className="manage-turmas-grid-section">
        {hasError ? (
          <p className="turmas-error-message">
            Ocorreu um erro ao carregar suas turmas. Tente novamente mais tarde.
          </p>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : turmas.length === 0 ? (
          <p className="turmas-empty-message">
            Você ainda não gerencia nenhuma turma.
          </p>
        ) : (
          <div className="manage-turmas-grid">
            {turmas.map(turma => (
              <TurmaCard key={turma.id} turma={turma} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
