export interface IAvaliacao {
  id: number;
  avaliador_id: string;
  equipe_id: string;
  notas: {
    criterio1: string;
    criterio2: string;
    criterio3: string;
  };
}

export interface IAvaliacaoFormData {
  id: number;
  avaliador_id: string;
  equipe_id: string;
  notas: {
    criterio1: string;
    criterio2: string;
    criterio3: string;
  };
}
