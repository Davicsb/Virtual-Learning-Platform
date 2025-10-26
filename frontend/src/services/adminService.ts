// src/services/adminService.ts
import type { User, Curso } from '../types/models';
import type { CreateCursoRequest } from '../types/curso.types'; // Novo tipo
import { mockUsersDB, mockCursosDB } from '../mocks/admin.mocks'; // Importa os DBs

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Busca a lista de todos os usuários (lendo do DB mock).
 */
export const getAllUsers = async (): Promise<User[]> => {
  console.log('[MOCK API - Admin] Buscando todos os usuários do DB mock...');
  await delay(700);
  return mockUsersDB;
};

/**
 * Busca a lista de todos os cursos (lendo do DB mock).
 */
export const getAllCursosAdmin = async (): Promise<Curso[]> => {
  console.log('[MOCK API - Admin] Buscando todos os cursos do DB mock...');
  await delay(500);
  return mockCursosDB;
};

/**
 * Cria um novo curso (Admin).
 */
export const createCurso = async (payload: CreateCursoRequest): Promise<Curso> => {
  console.log('[MOCK API - Admin] Criando novo curso:', payload);
  await delay(900);
  
  const novoCurso: Curso = {
    id: `c-${Date.now()}`,
    title: payload.title,
    description: payload.description,
  };
  
  mockCursosDB.push(novoCurso); // Adiciona ao DB mock
  console.log('[MOCK DB] Cursos agora:', mockCursosDB);
  return novoCurso;
};

// A função de criar usuário (registerUserByAdmin) já está no authService