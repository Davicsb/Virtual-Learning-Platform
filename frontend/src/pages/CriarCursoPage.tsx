// src/pages/CriarCursoPage.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { createCurso } from '../services/adminService'; // Serviço do Admin para criar curso
import './CriarTurmaPage.css'; // Reutiliza o CSS da página de criar turma

export const CriarCursoPage = () => {
  // Estados para os campos do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Estados de controle
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Hook para navegação
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Previne recarregamento da página
    setIsSaving(true); // Ativa estado de "salvando"
    setError(null); // Limpa erros anteriores
    
    try {
      // Validação básica
      if (!title) {
        throw new Error('O título do curso é obrigatório.');
      }
      
      // Chama o serviço para criar o curso (mock)
      await createCurso({ title, description });
      console.log('Curso criado com sucesso:', { title, description });
      
      // Após criar, volta para o dashboard do admin
      navigate('/app/dashboard-admin'); 

    } catch (err: any) {
      // Se der erro, mostra a mensagem
      setError(err.message || 'Erro ao criar o curso.');
    } finally {
      // Independentemente do resultado, para de "salvar"
      setIsSaving(false);
    }
  };

  return (
    // Reutiliza o container e header do CSS de Criar Turma
    <div className="criar-turma-container"> 
      <div className="criar-turma-header">
        <h1 className="criar-turma-title">Criar Novo Curso</h1>
        <p className="criar-turma-subtitle">
          Defina o título e a descrição do novo curso.
        </p>
      </div>
      
      {/* Reutiliza o card do formulário do CSS de Criar Turma */}
      <div className="criar-turma-card">
        <form onSubmit={handleSubmit}>
          {/* Mostra mensagem de erro, se houver */}
          {error && <div className="form-error-message">{error}</div>}
          
          {/* Campo de Input para o Título */}
          <Input
            label="Título do Curso*"
            type="text"
            placeholder="Ex: Introdução à Inteligência Artificial"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSaving}
            required // Obrigatório
          />
          
          {/* Campo de Input para a Descrição */}
          <Input
            label="Descrição do Curso"
            type="text" // Poderia ser <textarea> usando um componente diferente ou ajustando o Input
            placeholder="Ex: Fundamentos de IA, algoritmos e aplicações práticas."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSaving}
          />
          
          {/* Rodapé com botões Cancelar e Salvar */}
          <footer className="criar-turma-footer">
            <Button 
              type="button" // Importante ser 'button' para não submeter o form
              variant="secondary" 
              onClick={() => navigate('/app/dashboard-admin')} // Volta ao dashboard
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" // Botão que envia o formulário
              variant="primary" 
              disabled={isSaving}
            >
              {isSaving ? 'Salvando...' : 'Salvar Curso'} 
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};