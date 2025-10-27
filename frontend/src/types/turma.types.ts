// CONTRATO DE LISTAGEM

import type { User, UserRole, Curso } from './models';

export interface TurmaSummary {
  id: string;
  name: string;
  courseTitle: string;
  professorName: string;
}

export interface TurmaDetailsResponse {
  id: string;
  name: string;
  description: string;
  course: Curso;
  professores: User[];
  alunos: User[];
}

export interface AddUserToTurmaRequest {
  userId: string;
  role: typeof UserRole.ALUNO | typeof UserRole.PROFESSOR;
}

export interface RemoveUserFromTurmaRequest {
  userId: string;
}

export interface CreateMaterialRequest {
  title: string;
  description: string;
  fileUrl?: string;
  externalLink?: string;
}

export interface CreateAvisoRequest {
  title: string;
  content: string;
}

export interface CreateAtividadeRequest {
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
}

export interface CreateTurmaRequest {
  name: string;
  description: string;
  courseTitle: string; // Simplificado por enquanto
}