import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { criarMaterial } from '../services/materialService'; // Novo service
import './CriarTurmaPage.css'; // Reaproveita o mesmo estilo visual

export const AdicionarMaterialPage = () => {
  // Pega o ID da turma atual
  const { id } = useParams<{ id: string }>();

  // Estados do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');

  // Estados de controle
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (!titulo || !descricao) {
        throw new Error('Título e descrição são obrigatórios.');
      }

      // Chama o serviço para criar o material
      const novoMaterial = await criarMaterial({
        turmaId: id!,
        titulo,
        descricao,
        link,
      });

      console.log('Material criado:', novoMaterial);

      // Redireciona de volta para a página da turma
      navigate(`/app/turma/${id}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar material.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="criar-turma-container">
      <div className="criar-turma-header">
        <h1 className="criar-turma-title">Adicionar Material</h1>
        <p className="criar-turma-subtitle">
          Preencha os campos abaixo para adicionar um novo material à turma.
        </p>
      </div>

      <div className="criar-turma-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error-message">{error}</div>}

          <Input
            label="Título do Material*"
            type="text"
            placeholder="Ex: Aula 3 - Programação Assíncrona"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            disabled={isSaving}
            required
          />

          <Input
            label="Descrição*"
            type="text"
            placeholder="Ex: Slides e PDF disponíveis no link abaixo"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            disabled={isSaving}
            required
          />

          <Input
            label="Link (opcional)"
            type="url"
            placeholder="https://drive.google.com/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={isSaving}
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
              {isSaving ? 'Salvando...' : 'Salvar Material'}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};
