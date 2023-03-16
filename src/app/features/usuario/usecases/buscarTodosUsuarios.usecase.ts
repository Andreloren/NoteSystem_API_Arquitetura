import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarTodosUsuariosUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute() {
    const result = await this.repository.getAll();

    if (!result) {
      return null;
    }

    return result;
  }
}
