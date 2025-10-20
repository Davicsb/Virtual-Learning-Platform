import { Logo } from '../common/Logo';
import './Header.css';

export const Header = () => {
  return (
    <header className="main-header">
      <Logo size="small" />
      
      {/* No futuro, poderíamos adicionar um <nav> ou botões aqui,
        mas por enquanto, ele só tem a logo, como na Landing Page.
      */}
    </header>
  );
};