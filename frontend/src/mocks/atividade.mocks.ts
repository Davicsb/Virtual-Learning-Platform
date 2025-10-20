import type { Atividade, Entrega } from '../types/models';
import type { AtividadePendente, AtividadeDetailsResponse } from '../types/atividade.types';
import { StatusEntrega } from '../types/models';
import { MOCK_USER_ALUNO } from './user.mocks';

// mock aux (Atividades Individuais)

export const MOCK_ATIVIDADE_1: Atividade = {
  id: 'at-1',
  title: 'Trabalho 01: Componentes React',
  description: 'Crie 3 componentes React com TypeScript e envie o link do GitHub.',
  dueDate: '2025-10-25T23:59:00Z',
  maxPoints: 10,
  classId: 't-1',
};

export const MOCK_ATIVIDADE_2: Atividade = {
  id: 'at-2',
  title: 'Quiz: Conceitos de API REST',
  description: 'Quiz rápido sobre os verbos HTTP e status codes.',
  dueDate: '2025-10-18T23:59:00Z', // Já passou
  maxPoints: 5,
  classId: 't-1',
};

// mock aux (Entregas Individuais)

export const MOCK_ENTREGA_PENDENTE: Entrega = {
  id: 'e-1',
  activityId: 'at-1',
  studentId: MOCK_USER_ALUNO.id,
  status: StatusEntrega.PENDENTE,
  files: [],
  submittedAt: null,
  grade: null,
  feedback: null,
};

export const MOCK_ENTREGA_AVALIADA: Entrega = {
  id: 'e-2',
  activityId: 'at-2',
  studentId: MOCK_USER_ALUNO.id,
  status: StatusEntrega.AVALIADA,
  files: [
    { id: 'f-1', fileName: 'quiz-respostas.pdf', fileUrl: '/uploads/quiz-respostas.pdf' }
  ],
  submittedAt: '2025-10-17T20:00:00Z',
  grade: 4.5,
  feedback: 'Bom trabalho, mas revise os status codes 5xx.',
};

// (RF017) Mock para a lista de atividades pendentes do ALUNO
export const MOCK_ATIVIDADES_PENDENTES: AtividadePendente[] = [
  {
    activityId: 'at-1',
    activityTitle: 'Trabalho 01: Componentes React',
    turmaName: 'Desenvolvimento Web 2025/2',
    turmaId: 't-1',
    dueDate: '2025-10-25T23:59:00Z',
  },
];

// (RF006) Mock para os detalhes de uma atividade (visão do ALUNO)
export const MOCK_ATIVIDADE_DETAILS_ALUNO: AtividadeDetailsResponse = {
  ...MOCK_ATIVIDADE_1, // Pega todos os dados da atividade 1
  minhaEntrega: MOCK_ENTREGA_PENDENTE, // Anexa a entrega do aluno
};

//RF006, RF013) Mock para os detalhes de uma atividade (visão do PROFESSOR)
export const MOCK_ATIVIDADE_DETAILS_PROF: AtividadeDetailsResponse = {
  ...MOCK_ATIVIDADE_2, // Pega todos os dados da atividade 2
  // Anexa a lista de entregas de TODOS os alunos
  entregasDosAlunos: [MOCK_ENTREGA_AVALIADA], 
};