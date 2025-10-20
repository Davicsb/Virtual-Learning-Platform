import { type InputHTMLAttributes } from 'react';
import './Input.css';

// Permite que o Input receba qualquer prop de um <input> HTML
// (como 'type', 'placeholder', 'onChange', 'value', etc.)
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // Para mostrar mensagens de validação
}

export const Input = ({ label, id, error, ...props }: InputProps) => {
  // Garantimos que o 'id' existe para conectar o label ao input
  const inputId = id || props.name || label;

  return (
    <div className={`input-group ${error ? 'input-group-error' : ''}`}>
      <label htmlFor={inputId} className="input-label">
        {label}
      </label>
      <input 
        id={inputId} 
        className="input-field" 
        {...props} 
      />
      {/* Mostra a mensagem de erro se ela existir */}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};