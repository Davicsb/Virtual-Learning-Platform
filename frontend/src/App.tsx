// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import { AppLayout } from './components/layout/AppLayout';

// Páginas Públicas
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CourseCatalogPage } from './pages/CourseCatalogPage'; 

// Páginas Privadas (Autenticadas)
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { MinhasTurmasPage } from './pages/MinhasTurmasPage';
// 1. IMPORTE A NOVA PÁGINA
import { MeuPerfilPage } from './pages/MeuPerfilPage';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rotas Públicas --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage />} />
        <Route path="/cursos" element={<CourseCatalogPage />} />

        {/* --- Rotas Privadas / Autenticadas --- */}
        <Route path="/app" element={<AppLayout />}>
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="turmas" element={<MinhasTurmasPage />} />
          
          {/* 2. ADICIONE A NOVA ROTA AQUI */}
          <Route path="perfil" element={<MeuPerfilPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;