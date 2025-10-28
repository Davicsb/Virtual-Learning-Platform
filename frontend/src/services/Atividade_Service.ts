import type { AtividadeDetailsResponse, SubmitEntregaRequest, GradeEntregaRequest } from "../types/atividade.types";
import type { Atividade } from "../types/models";
import { useAuthStore } from '../store/authStore';
import { getMeProfessor } from '../services/Auth_Service';
import type { AlunoAssignment } from '../types/models';


const API_BASE = 'http://localhost:8080/data'; //troca por 8082 para debugar
const token = localStorage.getItem('token');

export const GetAtividades = async (): Promise<Atividade[]> => {
    const response = await fetch(`${API_BASE}/atividades`, {
        method: 'GET',
    });

    if (!response.ok) throw new Error('Erro ao buscar atividades');
    return await response.json();
}

export const getMinhasAtividadesProfessor = async (): Promise<Atividade[]> => {
    const user = useAuthStore.getState().user;
    const response = await fetch(`${API_BASE}/atividades`, {
        method: 'GET',
    });
    if (!response.ok) throw new Error('Erro ao buscar atividades');
    const todasAtividades: Atividade[] = await response.json();

    if(!user) return [];

    if (user.userType === 'PROFESSOR') {
        const professor = await getMeProfessor();
        return todasAtividades.filter(a => a.tutor.name === professor.name);
    }
    
    return [];
}

export const getMinhasAtividadesAluno = async (alunoId: number): Promise<AlunoAssignment[]> => {
  const response = await fetch(`${API_BASE}/aluno/${alunoId}/atividades`, {
    method: 'GET',
  });

  if (!response.ok) throw new Error('Erro ao buscar atividades do aluno');
  return await response.json();
};


export const getAtividadeDetails = async (atividadeId: string): Promise<AtividadeDetailsResponse> => {
    const response = await fetch(`${API_BASE}/atividades/${atividadeId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error('Erro ao buscar detalhes da atividade');
    return await response.json();
}

export const submitAtividade = async ( payload: SubmitEntregaRequest): Promise<AlunoAssignment> => {

  const response = await fetch(`${API_BASE}/aluno/submit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Erro ao entregar atividade');
  return await response.json();
};


export const gradeAtividade = async ( payload: GradeEntregaRequest ): Promise<AlunoAssignment> => {

  const response = await fetch(`${API_BASE}/professor/grade`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Erro ao avaliar entrega');
  return await response.json();
};
