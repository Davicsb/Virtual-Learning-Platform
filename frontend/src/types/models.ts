// CONTRATO ENTIDADES BD
export type UserRole = typeof UserRole[keyof typeof UserRole];
export type StatusEntrega = typeof StatusEntrega[keyof typeof StatusEntrega];

export const UserRole = {
  ADMIN: 'ADMIN',
  PROFESSOR: 'PROFESSOR',
  ALUNO: 'ALUNO',
} as const;

export interface User {
  id: string;
  name?: string;
  email: string;
  userType: UserRole;
}

export interface Curso {
  id: string;
  title: string;
  content: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  externalLink?: string;
  createdAt: string; 
}

export interface Aviso {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface Atividade {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  classId: string;
}

export interface ArquivoEntrega {
  id: string;
  fileName: string;
  fileUrl: string;
}

export const StatusEntrega = {
  PENDENTE: 'pendente',
  ENTREGUE: 'entregue',
  AVALIADA: 'avaliada',
} as const;

export interface Entrega {
  id: string;
  activityId: string;
  studentId: string;
  status: StatusEntrega;
  files: ArquivoEntrega[];
  submittedAt: string | null;
  grade: number | null;
  feedback: string | null;
}