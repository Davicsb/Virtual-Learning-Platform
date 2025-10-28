import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getMe, getMeAluno, getMeProfessor } from '../../services/Auth_Service';
import { LoadingSpinner } from '../common/LoadingSpinner';
import './AppLayout.css';

export const AppLayout = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const baseUser = await getMe();
        const detalhes = baseUser.userType === 'ALUNO'
          ? await getMeAluno()
          : await getMeProfessor();

        const userFinal = {
          ...baseUser,
          name: detalhes.name,
        };

        setUser(userFinal); // Salva o objeto completo na memória
      } catch (err) {
        console.error('Sessão inválida ou expirada:', err);
        setUser(null);
        navigate('/login');
      } finally {
        setIsLoadingApp(false);
      }
    };

    if (!user) {
      carregarUsuario();
    } else {
      setIsLoadingApp(false);
    }
  }, [setUser, navigate, user]);

  if (isLoadingApp) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!user && !isLoadingApp) {
    return null;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};
