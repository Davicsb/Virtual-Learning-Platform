// c=CONTRATO ENTREGA DE ATIVIDADE

import type { Atividade, Entrega } from './models';

export interface AtividadePendente {
  activityId: string;
  activityTitle: string;
  turmaName: string;
  turmaId: string;
  dueDate: string;
}

export interface AtividadeDetailsResponse extends Atividade {
  minhaEntrega?: Entrega;
  entregasDosAlunos?: Entrega[];
}

export interface SubmitEntregaRequest {
  files: Array<{ fileName: string; fileUrl: string }>;
  studentComments: string;
}

export interface GradeEntregaRequest {
  grade: number;
  feedback: string;
}