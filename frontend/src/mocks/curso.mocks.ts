import type { Curso } from '../types/models';


export const MOCK_CURSO_LIST: Curso[] = [
  {
    id: 'c1',
    title: 'Desenvolvimento Web com React e TypeScript',
    description: 'Aprenda a construir aplicações web modernas e robustas do zero, com as ferramentas mais pedidas pelo mercado.'
  },
  {
    id: 'c2',
    title: 'Infraestrutura Ágil com Docker e Kubernetes',
    description: 'Domine containers e orquestração para otimizar o deploy e a escalabilidade de suas aplicações.'
  },
  {
    id: 'c3',
    title: 'UI/UX Design para Aplicações Modernas',
    description: 'Foco em prototipação, testes de usabilidade e criação de interfaces que encantam o usuário.'
  },
  {
    id: 'c4',
    title: 'Gestão de Projetos Ágeis com Scrum',
    description: 'Aprenda a liderar equipes de alta performance e entregar valor de forma mais rápida e eficiente.'
  },
];

const cursosIniciais: Curso[] = [
  { id: 'c1', title: 'Desenvolvimento Web com React e TypeScript', description: '...' },
  { id: 'c2', title: 'Infraestrutura Ágil com Docker e Kubernetes', description: '...' },
  { id: 'c3', title: 'UI/UX Design para Aplicações Modernas', description: '...' },
  { id: 'c4', title: 'Gestão de Projetos Ágeis com Scrum', description: '...' },
];

// DB em memória
export let mockCursosDB = [...cursosIniciais];