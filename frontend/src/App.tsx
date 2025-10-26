// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import { AppLayout } from './components/layout/AppLayout'; // Layout para páginas autenticadas

// Páginas Públicas (sem layout de sidebar)
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CourseCatalogPage } from './pages/CourseCatalogPage'; 

// Páginas Privadas (Autenticadas - dentro do AppLayout)
import { StudentDashboardPage } from './pages/StudentDashboardPage'; // Dashboard Aluno
import { MinhasTurmasPage } from './pages/MinhasTurmasPage'; // Turmas Aluno
import { MeuPerfilPage } from './pages/MeuPerfilPage'; // Perfil (Comum)
import { ProfessorDashboardPage } from './pages/ProfessorDashboardPage'; // Dashboard Professor
import { GerenciarTurmasPage } from './pages/GerenciarTurmasPage'; // Gerenciar Turmas (Professor)
import { CriarTurmaPage } from './pages/CriarTurmaPage'; // Criar Turma (Professor/Admin)
import { AdminDashboardPage } from './pages/AdminDashboardPage'; // Dashboard Admin
import { CriarCursoPage } from './pages/CriarCursoPage'; // Criar Curso (Admin)
import { CadastrarUsuarioPage } from './pages/CadastrarUsuarioPage'; // Cadastrar Usuário (Admin)
import { TurmaPage } from "./pages/TurmaPage";
import { AdicionarMaterialPage } from "./pages/AdicionarMaterialPage";
import { AdicionarAvisoPage } from "./pages/AdicionarAvisoPage";

// Importa o CSS Global (com as cores-tema)
import './index.css';

function App() {
  return (
    // O BrowserRouter habilita o roteamento na aplicação
    <BrowserRouter>
      {/* O Routes é o container que escolhe qual rota renderizar */}
      <Routes>
        
        {/* --- Rotas Públicas --- */}
        {/* Estas rotas são acessíveis sem login e não usam o AppLayout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage />} />
        <Route path="/cursos" element={<CourseCatalogPage />} />

        {/* --- Rotas Privadas / Autenticadas --- */}
        {/* Todas as rotas que começam com /app usarão o AppLayout 
           (que inclui a Sidebar e a lógica de verificação de login) */}
        
        <Route path="/app" element={<AppLayout />}> 
          {/* O AppLayout renderiza o <Outlet />, que é preenchido pelas rotas filhas abaixo */}

          {/* Rotas de Aluno */}
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="turmas" element={<MinhasTurmasPage />} />
          <Route path="/app/turma/:id" element={<TurmaPage />} />
          <Route path="/app/turma/:id/material/novo" element={<AdicionarMaterialPage />} />
          <Route path="/app/turma/:id/aviso/novo" element={<AdicionarAvisoPage />} />
          
          
          {/* Rotas de Professor */}
          <Route path="dashboard-professor" element={<ProfessorDashboardPage />} />
          <Route path="minhas-turmas-professor" element={<GerenciarTurmasPage />} />
          {/* A rota "criar-turma" é usada por Prof e Admin */}
          
          {/* Rotas de Admin */}
          <Route path="dashboard-admin" element={<AdminDashboardPage />} />
          <Route path="cadastrar-usuario" element={<CadastrarUsuarioPage />} /> 
          <Route path="criar-curso" element={<CriarCursoPage />} /> 
          {/* Rota para criar turma (usada por Prof e Admin) */}
          <Route path="criar-turma" element={<CriarTurmaPage />} /> 
          {/* Rotas futuras do Admin para GERENCIAR usuários/cursos/turmas entrariam aqui */}
          {/* <Route path="gerenciar-usuarios" element={<GerenciarUsuariosPage />} /> */}
          {/* <Route path="gerenciar-cursos" element={<GerenciarCursosPage />} /> */}

          {/* Rotas Comuns (acessíveis por Aluno, Professor, Admin) */}
          <Route path="perfil" element={<MeuPerfilPage />} />

          {/* Rota para detalhes de uma turma específica (exemplo futuro) */}
          {/* <Route path="turma/:turmaId" element={<DetalhesTurmaPage />} /> */}

        </Route>

        {/* (Opcional) Rota Curinga para páginas não encontradas */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;