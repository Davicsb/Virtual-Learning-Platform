// 1. Importa os TIPOS (contratos de request/response)
import type { LoginRequest, AuthResponse, UpdateUserRequest } from '../types/auth.types';
import type { RegisterProfessorRequest } from '../types/models';
import type { RegisterRequest } from '../types/models'
import type { User } from '../types/models';
import type { Aluno } from '../types/models';
import type { Tutor } from '../types/models'


/**
 * (RF001) Simula o login do usuário.
 * Nossos componentes React vão chamar esta função.
 */
export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch('http://localhost:8080/auth/login', { //troca por 8081 para debugar
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas ou erro no servidor.');
  }

  return await response.json(); // Deve retornar { user, token }
};

export const register = async (payload: { name: string; email: string; password: string }) => {
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao criar conta.');
  }

  return await response.json(); // opcional: pode retornar o novo usuário ou mensagem
};

export const getMe = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId'));

  if (!token || !userId) {
    throw new Error('Token não encontrado ou ID do usuário não encontrado.');
  }

  const response = await fetch(`http://localhost:8080/data/aluno/by-user/${userId}`, { //troca por 8082 para debugar
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao buscar usuário autenticado.');
  }

  const user: User = await response.json();
  return user;
};

export const getMeAluno = async (): Promise<Aluno> => {
  const token = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId'));

  if (!token || !userId) {
    throw new Error("Token ou ID de usuário não encontrado");
  }

  //1. Busca o aluno pelo userId
  const alunoResponse = await fetch(`http://localhost:8080/data/aluno/user-id/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!alunoResponse.ok) {
    throw new Error('Aluno não encontrado');
  }

  return await alunoResponse.json();

}

export const getMeProfessor = async (): Promise<Tutor> => {
  const token = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId'));

  if (!token || !userId) {
    throw new Error("Token ou ID de usuário não encontrado");
  }

  //1. Busca o aluno pelo userId
  const professorResponse = await fetch(`http://localhost:8080/data/professor/user-id/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!professorResponse.ok) {
    throw new Error('Aluno não encontrado');
  }

  return await professorResponse.json();

}

export const updateProfileAluno = async (payload: UpdateUserRequest): Promise<Aluno> => {
  const token = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId'));

  if (!token || !userId) {
    throw new Error("Token ou ID de usuário não encontrado");
  }

  //1. Busca o aluno pelo userId
  const alunoResponse = await fetch(`http://localhost:8080/data/aluno/user-id/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!alunoResponse.ok) {
    throw new Error('Aluno não encontrado');
  }

  const aluno = await alunoResponse.json();

  //2. Atualizar o aluno pelo aluno.id
  const updateResponse = await fetch(`http://localhost:8080/data/aluno/${aluno.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!updateResponse.ok) {
    const errorData = await updateResponse.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao atualizar perfil.');
  }

  return await updateResponse.json();
};

export const updateProfileProfessor = async (payload: UpdateUserRequest): Promise<Tutor> => {
  const token = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId'));

  if (!token || !userId) {
    throw new Error("Token ou ID de usuário não encontrado");
  }

  const alunoResponse = await fetch(`http://localhost:8080/data/professor/user-id/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!alunoResponse.ok) {
    throw new Error('Professor não encontrado');
  }

  const aluno = await alunoResponse.json();

  const updateResponse = await fetch(`http://localhost:8082/data/professor/${aluno.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!updateResponse.ok) {
    const errorData = await updateResponse.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao atualizar perfil.');
  }

  return await updateResponse.json();
};


export const getUserById = async (userId: number): Promise<User> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:8080/data/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar usuário.');
  }

  return await response.json();
};

export const registerUserByAdmin = async (payload: RegisterRequest): Promise<User> => {
  const token = localStorage.getItem('token');

  const body = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    course: { id: payload.courseId},
    turmas: payload.turmaIds.map(id => ({ id })),
  };

  const response = await fetch(`http://localhost:8080/data/aluno`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Erro ao cadastrar aluno');

  const alunoCriado = await response.json();

  // Adapta para o tipo User
  return {
    id: alunoCriado.id,
    name: alunoCriado.name,
    email: alunoCriado.email,
    userType: 'ALUNO',
  };
};


export const registerProfessorByAdmin = async (
  payload: RegisterProfessorRequest
): Promise<User> => {
  const token = localStorage.getItem('token');

  const body = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    turmas: payload.turmaIds.map(id => ({ id })),
  };

  const response = await fetch(`http://localhost:8080/data/professor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Erro ao cadastrar professor');

  const professorCriado = await response.json();

  return {
    id: professorCriado.id,
    name: professorCriado.name,
    email: professorCriado.email,
    userType: 'PROFESSOR',
  };
};
