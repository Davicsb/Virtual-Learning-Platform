// src/services/materialService.ts
export async function getMateriaisByTurma(turmaId: string) {
  // Simulação — você pode trocar por uma requisição real (ex: fetch)
  return Promise.resolve([
    { id: 1, titulo: 'Aula 1 - Introdução', descricao: 'Slides e PDF disponíveis.' },
    { id: 2, titulo: 'Exercícios 1', descricao: 'Exercícios sobre HTML e CSS.' },
  ]);
}

export async function criarMaterial(data: {
  turmaId: string;
  titulo: string;
  descricao: string;
  link?: string;
}) {
  // Simula envio para backend
  return Promise.resolve({
    id: Date.now(),
    ...data,
    criadoEm: new Date().toISOString(),
  });
}
