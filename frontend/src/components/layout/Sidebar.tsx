// src/components/layout/Sidebar.tsx
import { Logo } from '../common/Logo';
import { NavLink, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types/models'; // Importa os papéis
import './Sidebar.css';

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role; // Pega o papel do usuário

  return (
    <aside className="sidebar">
      {/* Cabeçalho com a Logo */}
      <div className="sidebar-link-header">
        <Logo size="small" />
      </div>

      {/* Navegação Principal */}
      <nav className="sidebar-nav">
        
        {/* ======================= LINKS DE ALUNO ======================= */}
        {userRole === UserRole.ALUNO && (
          <>
            <NavLink to="/app/dashboard" className="sidebar-link">
              Meu Painel
            </NavLink>
            <NavLink to="/app/turmas" className="sidebar-link">
              Minhas Turmas
            </NavLink>
          </>
        )}

        {/* ======================= LINKS DE PROFESSOR ======================= */}
        {userRole === UserRole.PROFESSOR && (
          <>
            <NavLink to="/app/dashboard-professor" className="sidebar-link">
              Painel do Professor
            </NavLink>
            <NavLink to="/app/minhas-turmas-professor" className="sidebar-link">
              Gerenciar Turmas
            </NavLink>
             {/* Adicionar mais links do professor aqui */}
          </>
        )}
        
        {/* ======================= LINKS DE ADMINISTRADOR ======================= */}
        {userRole === UserRole.ADMIN && (
          <>
            {/* LINK PRINCIPAL DO ADMIN (DEVE APARECER) */}
            <NavLink to="/app/dashboard-admin" className="sidebar-link">
              Painel do Admin
            </NavLink>
            <NavLink to="/app/cadastrar-usuario" className="sidebar-link">
              Cadastrar Usuário
            </NavLink>
            <NavLink to="/app/criar-curso" className="sidebar-link">
              Criar Curso
            </NavLink>
            <NavLink to="/app/criar-turma" className="sidebar-link">
              Criar Turma
            </NavLink>
             {/* Adicionar mais links do admin aqui */}
          </>
        )}
        
        {/* ======================= LINKS COMUNS ======================= */}
         {/* Link "Meu Perfil" - Mostra para todos */}
         <NavLink to="/app/perfil" className="sidebar-link">
           {/* Adiciona "(Admin)" ao texto se for admin */}
           Meu Perfil {userRole === UserRole.ADMIN ? '(Admin)' : ''}
         </NavLink>

      </nav>

      {/* Rodapé da Sidebar */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <span className="user-name">{user?.name || 'Visitante'}</span>
          {/* Mostra o papel capitalizado */}
          <span className="user-role">
            {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : ''}
          </span>
        </div>
        {/* Link para Sair (Logout) */}
        <Link to="/" className="sidebar-link logout">
          Sair
        </Link>
      </div>
    </aside>
  );
};