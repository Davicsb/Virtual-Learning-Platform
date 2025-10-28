//adc
// src/pages/CadastrarUsuarioPage.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { registerUserByAdmin, registerProfessorByAdmin } from '../services/Auth_Service'; // Reutiliza a função
import { UserRole } from '../types/models'; // Importa papéis
import './CriarTurmaPage.css'; // Reutiliza CSS

export const CadastrarUsuarioPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.ALUNO); // Default para Aluno
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [turmaIds, setTurmaIds] = useState<number[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSaving(true);
  setError(null);

  try {
    if (!name || !email || !password) throw new Error('Todos os campos são obrigatórios.');
    if (password.length < 6) throw new Error('A senha deve ter no mínimo 6 caracteres.');

    if (role === UserRole.ALUNO) {
      if (!courseId || turmaIds.length === 0) throw new Error('Selecione o curso e pelo menos uma turma.');

      await registerUserByAdmin({
        name,
        email,
        password,
        courseId,
        turmaIds,
      });
    } if (role === UserRole.PROFESSOR) {
        if (turmaIds.length === 0) throw new Error('Selecione pelo menos uma turma.');
          await registerProfessorByAdmin({
            name,
            email,
            password,
            turmaIds,
          });
    }

    navigate('/app/dashboard-admin');
  } catch (err: any) {
    setError(err.message || 'Erro ao cadastrar usuário.');
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="criar-turma-container"> {/* Reutiliza classe */}
      <div className="criar-turma-header">
        <h1 className="criar-turma-title">Cadastrar Novo Usuário</h1>
        <p className="criar-turma-subtitle">
          Insira os dados do aluno ou professor.
        </p>
      </div>
      <div className="criar-turma-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error-message">{error}</div>}
          <Input label="Nome Completo*" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={isSaving} required/>
          <Input label="E-mail*" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSaving} required/>
          <Input label="Senha*" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSaving} required placeholder="Mínimo 6 caracteres"/>
          
          {/* Campo Select para o Papel */}
          <div className="input-group"> {/* Reutiliza estilo do Input */}
            <label htmlFor="role-select" className="input-label">Papel*</label>
            <select 
              id="role-select" 
              className="input-field" /* Reutiliza estilo do Input */
              value={role} 
              onChange={(e) => setRole(e.target.value as UserRole)}
              disabled={isSaving}
            >
              <option value={UserRole.ALUNO}>Aluno</option>
              <option value={UserRole.PROFESSOR}>Professor</option>
              {/* <option value={USER_ROLES.ADMIN}>Administrador</option> */}
            </select>
          </div>

          <footer className="criar-turma-footer">
            <Button type="button" variant="secondary" onClick={() => navigate('/app/dashboard-admin')} disabled={isSaving}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Cadastrar Usuário'}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};