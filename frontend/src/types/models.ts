// CONTRATO ENTIDADES BD
export type UserRole = typeof UserRole[keyof typeof UserRole];
export type StatusEntrega = typeof StatusEntrega[keyof typeof StatusEntrega];

export const UserRole = {
  ADMIN: 'ADMIN',
  PROFESSOR: 'PROFESSOR',
  ALUNO: 'ALUNO',
} as const;

export interface User {
  id: number;
  name?: string;
  email: string;
  userType: UserRole;
}

export interface Curso {
  id: number;
  title: string;
  content: string;
}

export interface Material {
  id: number;
  title: string;
  content: string;
  type: string;
  fileUrl?: string;
  externalLink?: string;
  categoria: string;
  turma: Turma;
  createdAt: string; 
}

export interface Aviso {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface Atividade {
  id: number;
  title: string;
  content: string;
  arquivos: string[],
  dueDate: string; // ou date
  maxPoints: number;
  turma: Turma;
  tutor: Tutor;
}

export interface ArquivoEntrega {
  id: number;
  fileName: string;
  fileUrl: string;
}

export const StatusEntrega = {
  PENDENTE: 'pendente',
  ENTREGUE: 'entregue',
  AVALIADA: 'avaliada',
} as const;

export interface Entrega {
  id: number;
  activityId: string;
  studentId: string;
  status: StatusEntrega;
  files: ArquivoEntrega[];
  submittedAt: string | null;
  grade: number | null;
  feedback: string | null;
}

export interface Aluno {
  id: number;
  name: string;
  course: Curso;
  turmas: Turma[];
  userId: number;
  materiaisVisualizados: number[];
}

export interface Tutor {
  id: number;
  name: string;
  turmas: Turma[];
  materiaisVisualizados: number[];
  userId: number;
}

export interface Turma {
  id: number;
  title: string;
  content: string;
  course: Curso;
  tutors: Tutor[];
  students: Aluno[];
}

export interface AlunoAssignment {
  id: number;
  alunoId: number;
  assignmentId: number;
  arquivos: string[] | null;
  grade: number | null;
  submitted: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  courseId: number;
  turmaIds: number[];
}

export interface RegisterProfessorRequest {
  name: string;
  email: string;
  password: string;
  turmaIds: number[];
}