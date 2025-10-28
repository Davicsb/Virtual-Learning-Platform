//adc
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { criarTurma } from '../services/Turma_Service'; // Importa o novo serviço
import './CriarTurmaPage.css';

export const CriarTurmaPage = () => {
  // Estados do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [courseTitle, setCourseTitle] = useState(''); // Campo simplificado

  // Estados de controle
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Validação simples (pode melhorar)
      if (!name || !courseTitle) {
        throw new Error('Nome da Turma e Título do Curso são obrigatórios.');
      }
      
      const novaTurma = await criarTurma({ name, description, courseTitle });
      console.log('Turma criada:', novaTurma);
      
      // Após criar, volta para a página de gerenciamento
      navigate('/app/minhas-turmas-professor'); 

    } catch (err: any) {
      setError(err.message || 'Erro ao criar a turma.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="criar-turma-container">
      <div className="criar-turma-header">
        <h1 className="criar-turma-title">Criar Nova Turma</h1>
        <p className="criar-turma-subtitle">
          Preencha os detalhes abaixo para configurar sua nova turma.
        </p>
      </div>

      {/* Card do Formulário */}
      <div className="criar-turma-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error-message">{error}</div>}

          <Input
            label="Nome da Turma*"
            type="text"
            placeholder="Ex: Desenvolvimento Web 2025/2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSaving}
            required // Marca como obrigatório no HTML
          />
          <Input
            label="Descrição da Turma"
            type="text" // Poderia ser <textarea> no futuro
            placeholder="Ex: Foco em React, Node.js e boas práticas"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSaving}
          />
          <Input
            label="Título do Curso Associado*"
            type="text"
            placeholder="Ex: Engenharia de Software"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            disabled={isSaving}
            required
          />

          <footer className="criar-turma-footer">
            {/* Botão para Cancelar e voltar */}
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/app/minhas-turmas-professor')}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            {/* Botão para Salvar */}
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Turma'}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};