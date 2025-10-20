// CONTRATO PARA AUTENTICAÇÃO

import type { User, UserRole } from './models';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}