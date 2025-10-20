import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large'; 
}

export const Logo = ({ size = 'medium' }: LogoProps) => {
  return (
    <div className={`logo-container logo-${size}`}>
      <span className="logo-text">Lúmen</span>
    </div>
  );
};