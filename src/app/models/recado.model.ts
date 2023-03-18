import { RecadosEntity } from "../shared/database/entities/recados.entity";
import { UsuariosEntity } from "../shared/database/entities/usuarios.entity";
import { status } from "../shared/types/tipos";

export class Recado {
  recadoId?: string;
  status?: status;
  descricao: string;
  detalhamento: string;
  usuarioId: number;
  recados?: RecadosEntity[];

  constructor(
    descricao: string,
    detalhamento: string,
    usuarioId: number,
    status?: status,
    recadoId?: string
  ) {
    this.descricao = descricao;
    this.detalhamento = detalhamento;
    this.usuarioId = usuarioId;
  }

  static create(
    descricao: string,
    detalhamento: string,
    usuarioId: number,
    status?: status,
    recadoId?: string
  ): Recado {
    return new Recado(descricao, detalhamento, usuarioId, status, recadoId);
  }
}
