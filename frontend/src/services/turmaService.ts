import type { TurmaSummary, TurmaDetailsResponse } from '../types/turma.types';
// Importa os VALORES
import { MOCK_TURMAS_LIST, MOCK_TURMA_DETAILS } from '../mocks/turma.mocks';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// (RF016) Busca a lista de turmas que o usuário (aluno/prof) participa
export const getMinhasTurmas = async (): Promise<TurmaSummary[]> => {
  console.log('[MOCK API] Buscando turmas do usuário (getMinhasTurmas)...');
  await delay(800); // Simula um carregamento um pouco mais longo
  return MOCK_TURMAS_LIST;
};

// (RF003) Busca os detalhes de UMA turma específica
export const getTurmaDetails = async (turmaId: string): Promise<TurmaDetailsResponse> => {
  console.log(`[MOCK API] Buscando detalhes da turma ID: ${turmaId}`);
  
  await delay(500);

  // A API real usaria o 'turmaId' para buscar no banco
  return MOCK_TURMA_DETAILS;
};