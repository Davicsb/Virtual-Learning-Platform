import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import './AppLayout.css';

export const AppLayout = () => {
  return (
    <div className="app-layout">
      {/* A sidebar fica na esquerda */}
      <Sidebar />
      
      {/* O 'Outlet' é o "buraco" onde o roteador
          vai renderizar a página atual (ex: o Dashboard) */}
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};