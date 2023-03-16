import { UsuariosEntity } from "../database/entities/usuarios.entity";
import { CriarUsuarioRequest } from "../app/shared/types/tipos";
import { usuarioRepository } from "../repository/usuariosRepository";

export class CriarUsuarioService {
  async execute({
    nome,
    email,
    cpf,
    senha,
  }: CriarUsuarioRequest): Promise<UsuariosEntity | Error> {
    if (await usuarioRepository.findOneBy({ cpf })) {
      return new Error("CPF já cadastrado");
    }

    const novoUsuario = usuarioRepository.create({ nome, email, cpf, senha });

    await usuarioRepository.save(novoUsuario);

    return novoUsuario;
  }
}
