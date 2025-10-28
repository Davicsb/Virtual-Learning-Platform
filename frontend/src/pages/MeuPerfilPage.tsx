//adc
import { useState, useEffect, type FormEvent } from 'react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { getMeAluno, getMeProfessor, updateProfileAluno, updateProfileProfessor } from '../services/Auth_Service';
import type { Aluno } from '../types/models';
import type { Turma } from '../types/models';
import { useAuthStore } from '../store/authStore';
import './MeuPerfilPage.css';

export const MeuPerfilPage = () => {
  // Estado do formulário de perfil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [turmas, setTurmas] = useState<Turma[]>([]);
  
  // Estado do formulário de senha
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Estados de controle
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Pega o usuário ATUAL da memória (para caso já esteja lá)
  const currentUser = useAuthStore((state) => state.user);
  // Pega a função de ATUALIZAR da memória
  const setUser = useAuthStore((state) => state.setUser);
  
  // Busca os dados do usuário ao carregar a página (se não estiver na memória)
  useEffect(() => {
  const fetchPerfil = async () => {
    try {
      if (!currentUser) return;

      if (currentUser.userType === 'ALUNO') {
        const aluno = await getMeAluno();
        setName(aluno.name);
        setCourse(aluno.course.title);
        setTurmas(aluno.turmas);
      }

      if (currentUser.userType === 'PROFESSOR') {
        const professor = await getMeProfessor(); // você precisa criar essa função
        setName(professor.name);
        setTurmas(professor.turmas);
        //setDisciplinas(professor.disciplinas); // exemplo
      }

      setEmail(currentUser.email);
      setUser({ ...currentUser, name }); // atualiza nome no store
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  fetchPerfil();
}, [currentUser, setUser]); // Depende do currentUser e setUser

  // Envio do formulário de PERFIL
  const handleProfileSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSavingProfile(true);
  setSuccessMessage(null);

  try {
    if (currentUser?.userType === 'ALUNO') {
      const updatedAluno = await updateProfileAluno({ name });
      setUser({ ...currentUser, name: updatedAluno.name });
    }

    if (currentUser?.userType === 'PROFESSOR') {
      const updatedProfessor = await updateProfileProfessor({ name });
      setUser({ ...currentUser, name: updatedProfessor.name });
    }

    setSuccessMessage('Perfil atualizado com sucesso!');
  } catch (err) {
    console.error(err);
  } finally {
    setIsSavingProfile(false);
  }
};

  // Envio do formulário de SENHA (simulação)
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSavingPassword(true);
    setSuccessMessage(null);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setSuccessMessage('Senha alterada com sucesso!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      // Tratar erro
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page-container">
      <h1 className="profile-page-title">Meu Perfil</h1>
      <p className="profile-page-subtitle">
        Gerencie suas informações pessoais e de acesso.
      </p>

      {successMessage && (
        <div className="profile-success-message">
          {successMessage}
        </div>
      )}

      <div className="profile-cards-container">
        {/* Card 1: Informações Pessoais */}
        <div className="profile-card">
          <h2>Informações Pessoais</h2>
          <form onSubmit={handleProfileSubmit}>
            <Input
              label="Nome Completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSavingProfile}
            />
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSavingProfile}
            />
            {currentUser?.userType === 'ALUNO' && (
              <>
                <Input label="Curso" type="text" value={course} disabled />
                <p>Turmas: {turmas.map(t => t.title).join(', ')}</p>
              </>
            )}

            {currentUser?.userType === 'PROFESSOR' && (
              <>
                <p>Turmas: {turmas.map(d => d.title).join(', ')}</p>
              </>
            )}
            <footer className="profile-card-footer">
              <Button type="submit" variant="primary" disabled={isSavingProfile}>
                {isSavingProfile ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </footer>
          </form>
        </div>

        {/* Card 2: Alterar Senha */}
        <div className="profile-card">
          <h2>Alterar Senha</h2>
          <form onSubmit={handlePasswordSubmit}>
            <Input
              label="Senha Atual"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={isSavingPassword}
            />
            <Input
              label="Nova Senha"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isSavingPassword}
            />
            <footer className="profile-card-footer">
              <Button type="submit" variant="secondary" disabled={isSavingPassword}>
                {isSavingPassword ? 'Alterando...' : 'Alterar Senha'}
              </Button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};