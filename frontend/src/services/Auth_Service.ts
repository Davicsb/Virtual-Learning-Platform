// 1. Importa os TIPOS (contratos de request/response)
import type { LoginRequest, AuthResponse, RegisterRequest, UpdateUserRequest } from '../types/auth.types';
import type { User } from '../types/models';


/**
 * (RF001) Simula o login do usuário.
 * Nossos componentes React vão chamar esta função.
 */
export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch('http://localhost:8081/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas ou erro no servidor.');
  }

  return await response.json(); // Deve retornar { user, token }
};

export const register = async (payload: { name: string; email: string; password: string }) => {
  const response = await fetch('http://localhost:8081/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao criar conta.');
  }

  return await response.json(); // opcional: pode retornar o novo usuário ou mensagem
};

export const getMe = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token não encontrado. Usuário não está autenticado.');
  }

  const response = await fetch('http://localhost:8082/data/aluno/{id}', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao buscar usuário autenticado.');
  }

  const user: User = await response.json();
  return user;
};
