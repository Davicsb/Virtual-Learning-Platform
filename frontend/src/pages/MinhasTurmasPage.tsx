import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { TurmaCard } from '../components/common/TurmaCard';
import { getMinhasTurmas } from '../services/turmaService';
import type { TurmaSummary } from '../types/turma.types';
import './MinhasTurmasPage.css';

export const MinhasTurmasPage = () => {
  const [turmas, setTurmas] = useState<TurmaSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados (os mesmos do Dashboard)
  useEffect(() => {
    getMinhasTurmas()
      .then(data => setTurmas(data))
      .catch(err => console.error("Falha ao buscar turmas", err))
      .finally(() => setIsLoading(false));
  }, []); // O [] garante que isso rode só uma vez

  return (
    <div className="turmas-page-container">
      <h1 className="turmas-page-title">Minhas Turmas</h1>
      <p className="turmas-page-subtitle">
        Acesse o material, veja os avisos e acompanhe as atividades de cada turma.
      </p>

      <section className="turmas-grid-section">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="turmas-grid">
            {turmas.map(turma => (
              <TurmaCard key={turma.id} turma={turma} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};