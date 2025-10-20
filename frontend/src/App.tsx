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

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rotas Públicas --- */}
        {/* (Não usam o AppLayout) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage />} />
        <Route path="/cursos" element={<CourseCatalogPage />} />

        {/* --- Rotas Privadas / Autenticadas --- */}
        {/* (Todas usam o AppLayout como "invólucro") */}
        
        <Route path="/app" element={<AppLayout />}>
          {/* A rota /app/dashboard renderiza o StudentDashboardPage */}
          <Route path="dashboard" element={<StudentDashboardPage />} />
          
          {/* (Páginas futuras que também usarão o layout) */}
          {/* <Route path="turmas" element={<MinhasTurmasPage />} /> */}
          {/* <Route path="perfil" element={<PerfilPage />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;