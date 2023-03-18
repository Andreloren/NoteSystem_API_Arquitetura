import { RecadosEntity } from "../shared/database/entities/recados.entity";

export class Recado {
  recadoId?: string;
  status?: string;
  descricao: string;
  detalhamento: string;
  usuarioId: number;
  recados?: RecadosEntity[];

  constructor(
    descricao: string,
    detalhamento: string,
    usuarioId: number,
    status?: string,
    recadoId?: string
  ) {
    this.descricao = descricao;
    this.detalhamento = detalhamento;
    this.usuarioId = usuarioId;
    this.status = status;
    this.recadoId = recadoId;
  }

  static create(
    descricao: string,
    detalhamento: string,
    usuarioId: number,
    status?: string,
    recadoId?: string
  ): Recado {
    return new Recado(descricao, detalhamento, usuarioId, status, recadoId);
  }
}
