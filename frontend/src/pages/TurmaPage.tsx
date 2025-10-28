// src/pages/TurmaPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Pega o usuário logado
import { UserRole } from '../types/models'; // Enum com os papéis do usuário
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getMateriaisByTurma } from '../services/materialService'; // Serviço para listar materiais
import './TurmaPage.css'; // Estilo no mesmo padrão das demais páginas

// ==============================
// Página de Materiais da Turma
// ==============================
export const TurmaPage = () => {
  // 1️⃣ Hooks principais
  const { id } = useParams<{ id: string }>(); // ID da turma na URL
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // Usuário logado (Zustand)

  // 2️⃣ Estados locais
  const [materiais, setMateriais] = useState<
    { id: number; titulo: string; descricao: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3️⃣ Busca os materiais da turma
  useEffect(() => {
    const fetchMateriais = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const dados = await getMateriaisByTurma(id!);
        setMateriais(dados);
      } catch {
        setError('Falha ao carregar materiais da turma.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateriais();
  }, [id]);

  // 4️⃣ Renderização do conteúdo
  return (
    <div className="turma-page-container">
      {/* Cabeçalho da página */}
      <header className="turma-page-header">
        <h1 className="turma-page-title">Material da turma</h1>
        <p className="turma-page-subtitle">
          {user?.userType === UserRole.PROFESSOR
            ? 'Gerencie materiais e comunicados desta turma.'
            : 'Veja os materiais e comunicados do professor.'}
        </p>

        {/* Botões só aparecem para PROFESSOR */}
        {user?.userType === UserRole.PROFESSOR && (
          <div className="turma-actions">
            <Button
              variant="primary"
              onClick={() => navigate(`/app/turma/${id}/material/novo`)}
            >
              + Adicionar Material
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate(`/app/turma/${id}/aviso/novo`)}
            >
              + Adicionar Aviso
            </Button>
          </div>
        )}
      </header>

      {/* Corpo da página */}
      <section className="materiais-section">
        <h2 className="materiais-section-title">Materiais</h2>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : materiais.length === 0 ? (
          <p className="materiais-empty">Nenhum material disponível no momento.</p>
        ) : (
          <div className="materiais-grid">
            {materiais.map((m) => (
              <div key={m.id} className="material-card">
                <h3 className="material-card-title">{m.titulo}</h3>
                <p className="material-card-desc">{m.descricao}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
