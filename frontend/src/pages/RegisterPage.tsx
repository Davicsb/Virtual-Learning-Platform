import { useState, type FormEvent } from 'react';
import { FormLayout } from '../components/layout/FormLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import './AuthForm.css';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Por enquanto, não vamos chamar o serviço, é só UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simula uma validação
    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }
    
    // Simula uma chamada de API
    await new Promise(r => setTimeout(r, 1500));
    console.log('Registrado!', { name, email });
    setIsLoading(false);
    alert('Conta criada com sucesso! (Simulação)');
    // Aqui navegaríamos para o login: navigate('/login')
  };

  return (
    <FormLayout title="Crie sua conta">
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome completo"
          type="text"
          name="name"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
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
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        
        {error && <div className="login-error-message">{error}</div>}

        <div className="login-button-container">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Criando...' : 'Criar conta'}
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ color: 'var(--cor-texto-secundario)' }}>
            Já tem uma conta?{' '}
          </span>
          <Link to="/login" style={{ color: 'var(--cor-primaria)', fontWeight: 600 }}>
            Faça login
          </Link>
        </div>
      </form>
    </FormLayout>
  );
};