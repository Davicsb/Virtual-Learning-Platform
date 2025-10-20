import type { Material, Aviso } from '../types/models';
// Importa os VALORES
import { MOCK_MATERIAIS } from '../mocks/conteudo.mocks';
import { MOCK_AVISOS } from '../mocks/conteudo.mocks';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// (RF004) Busca os materiais de uma turma
export const getMateriais = async (turmaId: string): Promise<Material[]> => {
  console.log(`[MOCK API] Buscando materiais da turma ID: ${turmaId}`);
  await delay(400);
  return MOCK_MATERIAIS;
};

// (RF011, RF015) Busca os avisos de uma turma
export const getAvisos = async (turmaId: string): Promise<Aviso[]> => {
  console.log(`[MOCK API] Buscando avisos da turma ID: ${turmaId}`);
  await delay(600);
  return MOCK_AVISOS;
};