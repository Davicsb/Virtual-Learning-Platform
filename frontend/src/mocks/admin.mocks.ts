// src/mocks/admin.mocks.ts
import type { User, Curso } from '../types/models';
import { UserRole } from '../types/models'; // Importa os papéis
import { MOCK_USER_ALUNO, MOCK_USER_PROFESSOR, MOCK_USER_ADMIN } from './user.mocks'; // Importa mocks individuais
import { mockCursosDB as allCursosFromCursoMocks } from './curso.mocks'; // Importa o DB de cursos (renomeado para clareza)

// --- Banco de Dados Mock de Usuários ---

// Mock inicial de usuários
const usuariosIniciais: User[] = [
  MOCK_USER_ALUNO,
  MOCK_USER_PROFESSOR,
  MOCK_USER_ADMIN,
  // Adiciona mais alguns para a lista inicial do admin
  { id: 'u-outro-aluno', name: 'Carla Dias', email: 'carla@email.com', role: UserRole.ALUNO },
  { id: 'u-outro-prof', name: 'Prof. Ricardo Gomes', email: 'ricardo@ava.com', role: UserRole.PROFESSOR },
];

// DB em memória para usuários (pode ser modificado pelo serviço)
export let mockUsersDB = [...usuariosIniciais]; // Cria uma cópia inicial

// --- Banco de Dados Mock de Cursos ---
// (Já definido em curso.mocks.ts e importado como 'allCursosFromCursoMocks')
// Apenas re-exportamos para conveniência do adminService, se necessário,
// mas o ideal é o adminService importar diretamente de curso.mocks.ts
export const mockCursosDB = allCursosFromCursoMocks;


// --- Exportações para Serviços ---
// (Estas podem ser removidas se os serviços importarem os DBs diretamente)

/**
 * Exporta a lista ATUAL de todos os usuários do DB mock.
 * Usado por `getAllUsers` no adminService.
 */
export const MOCK_ALL_USERS = mockUsersDB;

/**
 * Exporta a lista ATUAL de todos os cursos do DB mock.
 * Usado por `getAllCursosAdmin` no adminService.
 */
export const MOCK_ALL_CURSOS = mockCursosDB;