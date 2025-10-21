import { Logo } from '../common/Logo';
import { NavLink, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Sidebar.css';

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user); // <-- Lê o usuário da memória

  return (
    <aside className="sidebar">
      <div className="sidebar-link-header">
        <Logo size="small" />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/app/dashboard" className="sidebar-link">
          Meu Painel
        </NavLink>
        <NavLink to="/app/turmas" className="sidebar-link">
          Minhas Turmas
        </NavLink>
        <NavLink to="/app/perfil" className="sidebar-link">
          Meu Perfil
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          {/* Mostra o nome vindo da memória */}
          <span className="user-name">{user?.name || 'Visitante'}</span>
          {/* Mostra o papel vindo da memória */}
          <span className="user-role">{user?.role || 'Aluno'}</span>
        </div>
        <Link to="/" className="sidebar-link logout">
          Sair
        </Link>
      </div>
    </aside>
  );
};