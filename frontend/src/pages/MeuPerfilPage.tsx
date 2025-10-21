import { useState, useEffect, type FormEvent } from 'react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { getMe, updateProfile } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import './MeuPerfilPage.css';

export const MeuPerfilPage = () => {
  // Estado do formulário de perfil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
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
    // Se o usuário já está na memória (veio do AppLayout), usa ele
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setIsLoading(false);
    } else {
      // Se não, busca na API (fallback)
      getMe().then(userData => {
        setName(userData.name);
        setEmail(userData.email);
        setUser(userData); // Salva na memória também
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
        setIsLoading(false);
      });
    }
  }, [currentUser, setUser]); // Depende do currentUser e setUser

  // Envio do formulário de PERFIL
  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setSuccessMessage(null);

    try {
      const updatedUser = await updateProfile({ name, email });
      setUser(updatedUser); // <-- Atualiza a memória global
      setSuccessMessage('Perfil atualizado com sucesso!');
    } catch (err) {
      // Tratar erro
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