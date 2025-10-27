// src/pages/GerenciarTurmasPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { TurmaCard } from '../components/common/TurmaCard'; // Reutiliza o card
import { Button } from '../components/common/Button'; // Importa o botão
import { getMinhasTurmasProfessor } from '../services/turmaService'; // Serviço do professor
import type { TurmaSummary } from '../types/turma.types';
import './GerenciarTurmasPage.css'; // CSS da página

export const GerenciarTurmasPage = () => {
  const [turmas, setTurmas] = useState<TurmaSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Inicializa useNavigate

  // Busca as turmas do professor
  useEffect(() => {
    getMinhasTurmasProfessor()
      .then(data => setTurmas(data))
      .catch(err => console.error("Falha ao buscar turmas do professor", err))
      .finally(() => setIsLoading(false));
  }, []); // O [] garante que isso rode só uma vez

  // Função atualizada para navegar
  const handleCriarTurma = () => {
    navigate('/app/criar-turma'); // Navega para a página de criação
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
        {/* Botão para Criar Turma (RF009) */}
        <Button variant="primary" onClick={handleCriarTurma}>
          + Criar Nova Turma
        </Button>
      </div>

      <section className="manage-turmas-grid-section">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="manage-turmas-grid">
            {turmas.length > 0 ? (
              turmas.map(turma => (
                // O TurmaCard já tem o Link para /app/turma/:id (futura página de detalhes)
                <TurmaCard key={turma.id} turma={turma} />
              ))
            ) : (
              <p>Você ainda não gerencia nenhuma turma.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};