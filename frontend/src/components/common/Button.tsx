import React from 'react';
import './Button.css';

// Definimos as 'Props' que o botão pode receber
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // 'children' é o texto/ícone que vai dentro do botão
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'; // Estilos diferentes
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  ...props 
}: ButtonProps) => {
  
  // O '...props' passa qualquer outra prop de botão (como 'onClick', 'disabled')
  return (
    <button 
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'}`} 
      {...props}
    >
      {children}
    </button>
  );
};