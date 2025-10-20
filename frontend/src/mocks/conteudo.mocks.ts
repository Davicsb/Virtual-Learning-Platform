import type { Material, Aviso } from '../types/models';

// (RF004) Mock para a lista de materiais de uma turma
export const MOCK_MATERIAIS: Material[] = [
  {
    id: 'm-1',
    title: 'Slides Aula 01 - Introdução ao React',
    description: 'Slides da primeira aula.',
    fileUrl: '/uploads/aula01.pdf',
    createdAt: '2025-10-10T09:00:00Z',
  },
  {
    id: 'm-2',
    title: 'Vídeo - Configurando o Ambiente',
    description: 'Link para o vídeo tutorial.',
    externalLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    createdAt: '2025-10-12T14:30:00Z',
  },
];

// RF011, RF015) Mock para a lista de avisos de uma turma
export const MOCK_AVISOS: Aviso[] = [
  {
    id: 'a-1',
    title: 'IMPORTANTE: Mudança da Data da Prova 1',
    content: 'Pessoal, a P1 será adiada para o dia 30/10 devido ao feriado. Bons estudos!',
    authorName: 'Profa. Ana Silva',
    createdAt: '2025-10-18T11:00:00Z',
  },
  {
    id: 'a-2',
    title: 'Boas-vindas à turma',
    content: 'Sejam todos bem-vindos!',
    authorName: 'Profa. Ana Silva',
    createdAt: '2025-10-05T08:00:00Z',
  },
];