export async function criarAviso(data: {
  turmaId: string;
  titulo: string;
  mensagem: string;
}) {
  return Promise.resolve({
    id: Date.now(),
    ...data,
    criadoEm: new Date().toISOString(),
  });
}
