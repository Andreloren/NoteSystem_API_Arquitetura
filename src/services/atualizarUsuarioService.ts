import { UsuariosEntity } from "../database/entities/usuarios.entity";
import { usuarioRepository } from "../repository/usuariosRepository";
import { AtualizarUsuarioRequest } from "../app/shared/types/tipos";

export class AtualizarUsuarioService {
  async execute({
    usuarioId,
    nome,
    email,
    senha,
  }: AtualizarUsuarioRequest): Promise<UsuariosEntity> {
    const usuarioAtualizado = await usuarioRepository.findOneBy({ usuarioId });

    usuarioAtualizado!.nome = nome ? nome : usuarioAtualizado!.nome;
    usuarioAtualizado!.email = email ? email : usuarioAtualizado!.email;
    usuarioAtualizado!.senha = senha ? senha : usuarioAtualizado!.senha;

    await usuarioRepository.save(usuarioAtualizado!);

    return usuarioAtualizado!;
  }
}
