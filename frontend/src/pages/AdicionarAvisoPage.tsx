import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { criarAviso } from '../services/avisoService'; // Novo service
import './CriarTurmaPage.css'; // Mantém padrão visual

export const AdicionarAvisoPage = () => {
  const { id } = useParams<{ id: string }>();

  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (!titulo || !mensagem) {
        throw new Error('Título e mensagem são obrigatórios.');
      }

      const novoAviso = await criarAviso({
        turmaId: id!,
        titulo,
        mensagem,
      });

      console.log('Aviso criado:', novoAviso);
      navigate(`/app/turma/${id}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar aviso.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="criar-turma-container">
      <div className="criar-turma-header">
        <h1 className="criar-turma-title">Adicionar Aviso</h1>
        <p className="criar-turma-subtitle">
          Escreva um aviso para os alunos desta turma.
        </p>
      </div>

      <div className="criar-turma-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error-message">{error}</div>}

          <Input
            label="Título do Aviso*"
            type="text"
            placeholder="Ex: Prova adiada"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            disabled={isSaving}
            required
          />

          <Input
            label="Mensagem*"
            type="text"
            placeholder="Ex: A prova foi remarcada para a próxima segunda-feira."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            disabled={isSaving}
            required
          />

          <footer className="criar-turma-footer">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/app/turma/${id}`)}
              disabled={isSaving}
            >
              Cancelar
            </Button>

            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Publicando...' : 'Publicar Aviso'}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};
