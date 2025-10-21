// src/services/authService.ts

// 1. Importa os TIPOS (contratos de request/response)
import type { LoginRequest, AuthResponse, RegisterRequest, UpdateUserRequest } from '../types/auth.types';
import type { User } from '../types/models';
// 2. Importa os VALORES (os mocks)
import { MOCK_AUTH_RESPONSE } from '../mocks/auth.mocks';
import { MOCK_USER_PROFESSOR } from '../mocks/user.mocks';

/**
 * Função auxiliar para simular o tempo de espera da rede (API).
 * Isso é CRUCIAL para você testar seus "loadings" na tela.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * (RF001) Simula o login do usuário.
 * Nossos componentes React vão chamar esta função.
 */
export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  console.log('[MOCK API] Login solicitado para:', payload.email);

  // Simula 1 segundo de espera
  await delay(1000); 

  // Validação simples (só para mostrar)
  if (payload.email === 'erro@email.com') {
    throw new Error('Usuário ou senha inválidos.');
  }

  // Retorna o dado falso (o mock)
  return MOCK_AUTH_RESPONSE;
};

/**
 * (RF007) Simula o admin cadastrando um novo usuário.
 */
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

/**
 * Simula a busca do usuário logado (ex: ao recarregar a página)
 */
export const getMe = async (): Promise<User> => {
  console.log('[MOCK API] Buscando usuário logado (getMe)...');
  await delay(300);
  
  // Retorna o usuário do mock de autenticação
  return MOCK_AUTH_RESPONSE.user;
}

/**
 * (RF002) Simula a atualização do perfil do usuário.
 */
export const updateProfile = async (payload: UpdateUserRequest): Promise<User> => {
  console.log('[MOCK API] Atualizando perfil do usuário:', payload);
  
  // Simula o tempo de salvamento
  await delay(1000); 

  // Em um mock, apenas fingimos que salvamos e retornamos o usuário
  // com os dados que o usuário enviou (nome e email).
  // Também atualizamos o mock principal para persistir a mudança (simulação)
  MOCK_AUTH_RESPONSE.user.name = payload.name || MOCK_AUTH_RESPONSE.user.name;
  MOCK_AUTH_RESPONSE.user.email = payload.email || MOCK_AUTH_RESPONSE.user.email;
  
  return {
    ...MOCK_AUTH_RESPONSE.user, 
  };
};