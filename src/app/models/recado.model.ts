import { status } from "../shared/types/tipos";

export class Recado {
  recadoId?: string;
  status: status;
  descricao: string;
  detalhamento: string;

  constructor(
    status: status,
    descricao: string,
    detalhamento: string,
    recadoId?: string
  ) {
    this.status = status;
    this.descricao = descricao;
    this.detalhamento = detalhamento;
    this.recadoId = recadoId;
  }

  static create(
    status: status,
    descricao: string,
    detalhamento: string,
    recadoId?: string
  ): Recado {
    return new Recado(status, descricao, detalhamento, recadoId);
  }
}
