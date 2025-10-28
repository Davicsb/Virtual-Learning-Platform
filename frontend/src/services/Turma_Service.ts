import type { TurmaSummary, TurmaDetailsResponse, CreateTurmaRequest } from '../types/turma.types';
import type { Turma } from '../types/models'
import { useAuthStore } from '../store/authStore';
import { getMeAluno, getMeProfessor, updateProfileAluno, updateProfileProfessor } from '../services/Auth_Service';

export const mapTurmaToSummary = (turma: Turma): TurmaSummary => {
  return {
    id: turma.id.toString(), // converte number para string
    name: turma.title,
    courseTitle: turma.course?.title ?? 'Curso não informado',
    professorName: turma.tutors?.[0]?.name ?? 'Professor não definido',
  };
};


// (RF016) Busca a lista de turmas que o usuário (aluno/prof) participa
export const getTurmas = async (): Promise<TurmaSummary[]> => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:8082/data/turma', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Erro ao buscar turmas');
  return await response.json();
};

export const getMinhasTurmas = async (): Promise<TurmaSummary[]> => {
  const user = useAuthStore.getState().user;
  if (!user) return [];
  if (user.userType === 'ALUNO') {
      const aluno = await getMeAluno();

      if (aluno.turmas){
          return aluno.turmas.map(mapTurmaToSummary);
      }
  }

  if (user.userType === 'PROFESSOR') {
    const professor = await getMeProfessor();

    if (professor.turmas) {
        return professor.turmas.map(mapTurmaToSummary);
    }
  }

  return [];

}

export const getTurmaDetails = async (turmaId: string): Promise<Turma> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:8082/data/turma/${turmaId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Erro ao buscar detalhes da turma');
  return await response.json();
};

export const criarTurma = async (payload: CreateTurmaRequest): Promise<Turma> => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:8080/data/turma', { //troca por 8082 para debugar
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Erro ao criar turma');
  return await response.json();
};