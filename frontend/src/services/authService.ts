// src/services/authService.ts

// 1. Importa os TIPOS (contratos de request/response)
import type { LoginRequest, AuthResponse, RegisterRequest, UpdateUserRequest } from '../types/auth.types';
import type { User } from '../types/models';
// 2. Importa os VALORES (os mocks)
import { MOCK_AUTH_RESPONSE } from '../mocks/auth.mocks'; // Mock do Aluno (usado em getMe/updateProfile)
import { MOCK_USER_PROFESSOR } from '../mocks/user.mocks'; // Mock do Professor
import { MOCK_USER_ADMIN } from '../mocks/user.mocks'; // Mock do Admin

/**
 * Função auxiliar para simular o tempo de espera da rede (API).
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * (RF001) Simula o login do usuário.
 */
export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  console.log('[MOCK API] Login solicitado para:', payload.email);

  // Simula 1 segundo de espera
  await delay(1000);

  // Validação simples (só para mostrar)
  if (payload.email === 'erro@email.com') {
    throw new Error('Usuário ou senha inválidos.');
  }

  // --- MUDANÇA PARA TESTAR LOGIN DE ADMIN ---
// return MOCK_AUTH_RESPONSE; // Retornaria o aluno (Davi Aluno)
return { user: MOCK_USER_PROFESSOR, token: 'mock-prof-token.xyz.789' }; // Professor
  /*
   console.log('--- FORÇANDO LOGIN COMO ADMIN ---');
  return { // Retorna diretamente o ADMIN
    user: MOCK_USER_ADMIN,
    token: 'mock-admin-token.abc.123'
  };
  // Linhas para forçar login como outros papéis (comentadas):
  // 
  // 
  */
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
    id: `u-new-${Date.now()}`, // Cria um ID novo
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
};

/**
 * Simula a busca do usuário logado (ex: ao recarregar a página)
 * IMPORTANTE: Este ainda retorna o ALUNO do MOCK_AUTH_RESPONSE.
 * Para consistência total nos testes de ADM, seria ideal criar um
 * mock global de sessão ou ajustar esta função também.
 */
export const getMe = async (): Promise<User> => {
  console.log('[MOCK API] Buscando usuário logado (getMe)...');
  await delay(300);

  // ATENÇÃO: Retorna o usuário do mock original (Aluno)
  return MOCK_AUTH_RESPONSE.user;
}

/**
 * (RF002) Simula a atualização do perfil do usuário.
 * IMPORTANTE: Este ainda atualiza o ALUNO do MOCK_AUTH_RESPONSE.
 */
export const updateProfile = async (payload: UpdateUserRequest): Promise<User> => {
  console.log('[MOCK API] Atualizando perfil do usuário:', payload);

  // Simula o tempo de salvamento
  await delay(1000);

  // Atualiza o mock do Aluno (MOCK_AUTH_RESPONSE)
  MOCK_AUTH_RESPONSE.user.name = payload.name || MOCK_AUTH_RESPONSE.user.name;
  MOCK_AUTH_RESPONSE.user.email = payload.email || MOCK_AUTH_RESPONSE.user.email;

  // Retorna o usuário atualizado do mock (Aluno)
  return {
    ...MOCK_AUTH_RESPONSE.user,
  };
};