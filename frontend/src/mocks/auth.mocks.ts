// MOCK DE AUTENTICAÇÃO RF001

import type { AuthResponse } from '../types/auth.types';
import { MOCK_USER_ALUNO } from './user.mocks';

export const MOCK_AUTH_RESPONSE: AuthResponse = {
  // Simula que o "Davi Aluno" acabou de logar
  user: MOCK_USER_ALUNO,
  token: 'mock-jwt-token-string.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhdmlBbHVubyJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};