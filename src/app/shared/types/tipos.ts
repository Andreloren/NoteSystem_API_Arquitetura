import { UsuariosEntity } from "../database/entities/usuarios.entity";

export type status = "ativo" | "arquivado";



export type AtualizarUsuarioRequest = {
  usuarioId: number;
  nome: string;
  email: string;
  senha: string;
};

export type CriarRecadoRequest = {
  descricao: string;
  detalhamento: string;
  usuario: UsuariosEntity;
};

export type AtualizarRecadoRequest = {
  recadoId: string;
  usuarioId: number;
  descricao: string;
  detalhamento: string;
  status: status;
};
