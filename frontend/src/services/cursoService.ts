import type { Curso } from '../types/models';
import { MOCK_CURSO_LIST } from '../mocks/curso.mocks';

// Função auxiliar para simular o tempo de espera da rede (API)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Busca a lista pública de todos os cursos
 */
export const getAllCursos = async (): Promise<Curso[]> => {
  console.log('[MOCK API] Buscando todo o catálogo de cursos...');
  
  // Simula um carregamento de 1.2 segundos
  await delay(1200); 
  
  // Retorna a lista de mocks
  return MOCK_CURSO_LIST;
};