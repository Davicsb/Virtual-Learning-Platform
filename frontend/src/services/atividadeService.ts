import type { AtividadePendente, AtividadeDetailsResponse, SubmitEntregaRequest, GradeEntregaRequest } from '../types/atividade.types';
import type { Entrega } from '../types/models';
import { StatusEntrega } from '../types/models';
// Importa os VALORES
import { MOCK_ATIVIDADES_PENDENTES, MOCK_ATIVIDADE_DETAILS_ALUNO, MOCK_ATIVIDADE_DETAILS_PROF, MOCK_ENTREGA_PENDENTE, MOCK_ENTREGA_AVALIADA } from '../mocks/atividade.mocks';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// (RF017) Busca a lista de atividades pendentes do aluno
export const getAtividadesPendentes = async (): Promise<AtividadePendente[]> => {
  console.log('[MOCK API] Buscando atividades pendentes do aluno...');
  await delay(700);
  return MOCK_ATIVIDADES_PENDENTES;
};

// (RF006) Busca os detalhes de UMA atividade.
// Precisamos saber o "role" para retornar o mock correto (visão do aluno / prof).
export const getAtividadeDetails = async (atividadeId: string, userRole: 'aluno' | 'professor'): Promise<AtividadeDetailsResponse> => {
  console.log(`[MOCK API] Buscando detalhes da atividade ID: ${atividadeId} para ${userRole}`);
  
  await delay(500);

  if (userRole === 'aluno') {
    return MOCK_ATIVIDADE_DETAILS_ALUNO;
  } else {
    return MOCK_ATIVIDADE_DETAILS_PROF;
  }
};

// (RF018, RF019) Simula o ALUNO entregando uma atividade.
export const submitAtividade = async (atividadeId: string, payload: SubmitEntregaRequest): Promise<Entrega> => {
  console.log(`[MOCK API] Aluno entregando atividade ID: ${atividadeId}`, payload);
  
  await delay(1200); // Simula um upload, que é mais lento

  // Retorna o mock da entrega, mas com o status atualizado
  return {
    ...MOCK_ENTREGA_PENDENTE,
    status: StatusEntrega.ENTREGUE,
    files: payload.files.map((file, index) => ({
      id: `f-${index}`,
      fileName: file.fileName,
      fileUrl: file.fileUrl,
    })),
    submittedAt: new Date().toISOString(), // Marca a data de agora
  };
};

// (RF013) Simula o PROFESSOR avaliando uma entrega
export const gradeAtividade = async (entregaId: string, payload: GradeEntregaRequest): Promise<Entrega> => {
  console.log(`[MOCK API] Professor avaliando entrega ID: ${entregaId}`, payload);
  
  await delay(800);

  // Retorna o mock da entrega avaliada, mas com os dados da nota
  return {
    ...MOCK_ENTREGA_AVALIADA,
    id: entregaId,
    status: StatusEntrega.AVALIADA,
    grade: payload.grade,
    feedback: payload.feedback,
  };
};