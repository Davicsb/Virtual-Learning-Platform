import type { Curso } from '../types/models';


/**
 * Busca a lista pública de todos os cursos
 */
export const getAllCursos = async (): Promise<Curso[]> => {
  try {
      const response = await fetch('http://localhost:8082/data/curso', { // Vai no endpoint
            method: 'GET', //Metódo GET (que é publico)
            headers: {
                'Content-Type': 'application/json', // O corpo da requisição está em JSON
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json(); //lê o conteudo em JSON e transforma em um objeto
        console.log('Cursos recebidos:', data);
        return data as Curso[];
    
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        throw error;
    }
};