// src/pages/LoginPage.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLayout } from '../components/layout/FormLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { login } from '../services/authService';
import { useAuthStore } from '../store/authStore'; // <-- Importa o store
import './AuthForm.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser); // <-- Pega a função 'setUser'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const authResponse = await login({ email, password });
      
      setUser(authResponse.user); // <-- Salva o usuário na memória global

      navigate('/app/dashboard'); // <-- Redireciona

    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout title="Acesse sua conta">
      <form onSubmit={handleSubmit}>
        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        
        {error && <div className="login-error-message">{error}</div>}

        <div className="login-button-container">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};