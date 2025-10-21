import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom'; // <-- Importa useNavigate
import { useAuthStore } from '../../store/authStore';
import { getMe } from '../../services/authService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import './AppLayout.css';

export const AppLayout = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const navigate = useNavigate(); // <-- Hook para navegação

  // Busca o usuário quando o layout carrega
  useEffect(() => {
    // Se o usuário já está na memória, não precisa buscar de novo
    if (user) {
      setIsLoadingApp(false);
      return;
    }

    // Se não está, busca na API (mock)
    getMe()
      .then(userData => {
        setUser(userData); // Salva o usuário na memória global
      })
      .catch(err => {
        console.error("Sessão não encontrada ou inválida", err);
        setUser(null); // Limpa a memória
        navigate('/login'); // <-- Redireciona para o login se não encontrar
      })
      .finally(() => {
        setIsLoadingApp(false);
      });
  // Removido 'user' das dependências para evitar loop se getMe falhar
  }, [setUser, navigate]); 

  // Mostra um "Carregando..." geral enquanto busca o usuário
  if (isLoadingApp) {
    // Pode colocar um spinner mais centralizado na tela
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  // Se terminou de carregar e NÃO achou usuário (ex: token inválido), redireciona
  if (!user && !isLoadingApp) {
    // O useEffect já fez o navigate('/login')
    return null; // Não renderiza nada enquanto redireciona
  }

  // Se chegou aqui, está carregado e tem usuário
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};