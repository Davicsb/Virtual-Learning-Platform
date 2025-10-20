import { Logo } from '../common/Logo';
import { NavLink, Link } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = () => {
  const userName = "Davi Aluno"; // (Virá do mock/API no futuro)

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo size="small" />
      </div>

      <nav className="sidebar-nav">
        {/* Emojis removidos daqui */}
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
          <span className="user-name">{userName}</span>
          <span className="user-role">Aluno</span>
        </div>
        {/* Emoji removido daqui */}
        <Link to="/" className="sidebar-link logout">
          Sair
        </Link>
      </div>
    </aside>
  );
};