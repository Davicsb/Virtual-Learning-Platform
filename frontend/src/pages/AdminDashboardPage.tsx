// src/pages/AdminDashboardPage.tsx
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './AdminDashboardPage.css'; // Mantém o CSS (pode ajustar se necessário)

export const AdminDashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="dashboard-page"> 
      <h1 className="dashboard-title">Painel do Administrador</h1>
      <p className="dashboard-subtitle">
        Bem-vindo(a), {user?.name}! Selecione uma ação abaixo.
      </p>

      {/* Grid com botões/links grandes para as ações */}
      <div className="admin-actions-grid"> 
        
        <Link to="/app/cadastrar-usuario" className="action-card">

          <span className="action-title">Cadastrar Usuário</span>
          <span className="action-description">Adicione alunos ou professores ao sistema.</span>
        </Link>

        <Link to="/app/criar-curso" className="action-card">
          
          <span className="action-title">Criar Curso</span>
          <span className="action-description">Defina um novo curso na plataforma.</span>
        </Link>
        
        <Link to="/app/criar-turma" className="action-card">
        
          <span className="action-title">Criar Turma</span>
          <span className="action-description">Configure uma nova turma associada a um curso.</span>
        </Link>
        
         {/* Adicionar mais ações aqui no futuro (Gerenciar, etc.) */}
      </div>
    </div>
  );
};