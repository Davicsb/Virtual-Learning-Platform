//adc
// src/pages/LoginPage.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa hook de navegação
import { FormLayout } from '../components/layout/FormLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { login } from '../services/Auth_Service';
import { useAuthStore } from '../store/authStore'; // <-- Importa o store
import './AuthForm.css';
import { UserRole } from '../types/models';

export const LoginPage = () => {
  // Estados para controlar os campos de input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para controlar o carregamento e erros
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializa o hook de navegação
  const navigate = useNavigate();
  // Pega a função para salvar o usuário na memória global
  const setUser = useAuthStore((state) => state.setUser);

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Chama o serviço (garçom) para fazer login
      // (Lembre-se que o authService.ts está forçando um usuário específico)
      const authResponse = await login({ email, password });
      
      setUser(authResponse.user); // <-- Salva o usuário na memória global
      localStorage.setItem('email', authResponse.user.email);
      localStorage.setItem('token', authResponse.token); // <- Salva o token na memória local
      localStorage.setItem('userId', authResponse.user.id.toString());// <- Salva o id na memória local
      //navigate('/app/dashboard'); // <-- Redireciona

      // --- LÓGICA DE REDIRECIONAMENTO ---
      // 3. Verifica o papel (role) do usuário que acabou de logar
      if (authResponse.user.userType === UserRole.PROFESSOR) {
        console.log('Redirecionando para /app/dashboard-professor'); // Log
        navigate('/app/dashboard-professor');

      } else if (authResponse.user.userType === UserRole.ALUNO) {
        console.log('Redirecionando para /app/dashboard'); // Log
        navigate('/app/dashboard');

      } else if (authResponse.user.userType === UserRole.ADMIN) {
        console.log('Redirecionando para /app/dashboard-admin'); // Log
        navigate('/app/dashboard-admin');
        
      } else {
        // Se for outro papel (futuro) ou erro inesperado
        console.warn("Papel não reconhecido para redirecionamento:", authResponse.user.userType);
        navigate('/'); // Volta para a Landing Page
      }
      // --- FIM DA LÓGICA ---

    } catch (err: any) {
      // 4. Se o serviço 'login' der erro (ex: senha incorreta)
      console.error('Erro no login:', err); // Log do erro
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      // 5. Independentemente de sucesso ou erro, para de carregar
      setIsLoading(false);
    }
  };

  return (
    <FormLayout title="Acesse sua conta">
      {/* O 'onSubmit' é pego pelo <form> */}
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

        {/* Mostra o erro do servidor (se houver) */}
        {error && <div className="login-error-message">{error}</div>}

        <div className="login-button-container">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {/* Muda o texto do botão se estiver carregando */}
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};