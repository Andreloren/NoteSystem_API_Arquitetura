export type status = "ativo" | "arquivado" | string;

export type AtualizarRecadoRequest = {
  recadoId: string;
  usuarioId: number;
  descricao: string;
  detalhamento: string;
  status: status;
};
