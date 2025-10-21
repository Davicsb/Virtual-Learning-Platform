import { create } from 'zustand';
import type { User } from '../types/models';

// Define o formato da memória
interface AuthState {
  user: User | null; // O usuário pode ser 'User' ou 'null' (deslogado)
  setUser: (user: User | null) => void; // A função para atualizar o usuário
}

// 2. Cria o "hook" da memória
export const useAuthStore = create<AuthState>((set) => ({
  // Valor inicial
  user: null, 
  
  // Ação para modificar o estado
  // (Recebe o novo usuário e atualiza o estado 'user')
  setUser: (user) => set({ user }),
}));