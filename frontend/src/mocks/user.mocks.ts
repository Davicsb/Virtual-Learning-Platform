// MOCK USUÁRIOS

import type { User } from '../types/models';
import { UserRole } from '../types/models';

export const MOCK_USER_ALUNO: User = {
  id: 'u-aluno-123',
  name: 'Davi Aluno',
  email: 'davi.aluno@email.com',
  role: UserRole.ALUNO,
};

export const MOCK_USER_PROFESSOR: User = {
  id: 'u-prof-789',
  name: 'Profa. Ana Silva',
  email: 'ana.silva@ava.com',
  role: UserRole.PROFESSOR,
};

export const MOCK_USER_ADMIN: User = {
  id: 'u-admin-456',
  name: 'Adminstrador do AVA',
  email: 'admin@ava.com',
  role: UserRole.ADMIN,
};