import type { TurmaSummary, TurmaDetailsResponse } from '../types/turma.types';
import type { Curso } from '../types/models';
import { MOCK_USER_ALUNO, MOCK_USER_PROFESSOR } from './user.mocks';

// mock aux

const MOCK_CURSO_ENG_SOFTWARE: Curso = {
  id: 'c-1',
  title: 'Engenharia de Software',
  description: 'Curso focado nas práticas modernas de engenharia de software.',
};


// (RF016) Mock para a lista de turmas que o aluno/professor vê

export const MOCK_TURMAS_LIST: TurmaSummary[] = [
  {
    id: 't-1',
    name: 'Desenvolvimento Web 2025/2',
    courseTitle: 'Engenharia de Software',
    professorName: 'Profa. Ana Silva',
  },
  {
    id: 't-2',
    name: 'Banco de Dados Avançado',
    courseTitle: 'Engenharia de Software',
    professorName: 'Prof. Marcos Andrade',
  },
  {
    id: 't-3',
    name: 'Inteligência Artificial Aplicada',
    courseTitle: 'Ciência da Computação',
    professorName: 'Prof. Ricardo Gomes',
  },
];

// (RF003) Mock para os detalhes de UMA turma específica
export const MOCK_TURMA_DETAILS: TurmaDetailsResponse = {
  id: 't-1',
  name: 'Desenvolvimento Web 2025/2',
  description: 'Foco em React, TypeScript e APIs RESTful.',
  course: MOCK_CURSO_ENG_SOFTWARE,
  professores: [MOCK_USER_PROFESSOR],
  // Simula uma turma com apenas um aluno (o Davi)
  alunos: [MOCK_USER_ALUNO], 
};

export const MOCK_TURMAS_PROFESSOR: TurmaSummary[] = [
  {
    id: 't-1',
    name: 'Desenvolvimento Web 2025/2',
    courseTitle: 'Engenharia de Software',
    professorName: 'Profa. Ana Silva', // O nome do professor logado
  },
  {
    id: 't-4',
    name: 'Algoritmos Avançados',
    courseTitle: 'Ciência da Computação',
    professorName: 'Profa. Ana Silva',
  },
];