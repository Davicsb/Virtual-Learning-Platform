import type { LoginRequest, AuthResponse, RegisterRequest } from '../types/auth.types';
import type { User } from '../types/models';

// Importa os VALORES (mocks e constantes)
import { MOCK_AUTH_RESPONSE } from '../mocks/auth.mocks';
import { MOCK_USER_PROFESSOR } from '../mocks/user.mocks'; // Usado para simular um novo usuário

// Função auxiliar para simular o tempo de espera da rede (API)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// (RF001) Simula o login do usuário
export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  console.log('[MOCK API] Login solicitado para:', payload.email);

  // Simula 1 segundo de espera da rede
  await delay(1000);

  // Simula uma falha de login
  if (payload.email === 'erro@email.com') {
    throw new Error('Usuário ou senha inválidos.');
  }

  // Retorna o mock de sucesso
  return MOCK_AUTH_RESPONSE;
};

// (RF007) Simula o admin cadastrando um novo usuário
export const registerUserByAdmin = async (payload: RegisterRequest): Promise<User> => {
  console.log('[MOCK API] Admin cadastrando:', payload.email, 'com role:', payload.role);
  
  await delay(800);

  // Apenas simula a criação e retorna o novo usuário (sem token)
  return {
    ...MOCK_USER_PROFESSOR, // Pega o mock de professor como base
    id: 'u-new-user-xyz', // Cria um ID novo
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
};

// Simula a busca do usuário logado (ex: ao recarregar a página)
export const getMe = async (): Promise<User> => {
  console.log('[MOCK API] Buscando usuário logado (getMe)...');
  await delay(300);
  
  // Retorna o usuário do mock de autenticação
  return MOCK_AUTH_RESPONSE.user;
}