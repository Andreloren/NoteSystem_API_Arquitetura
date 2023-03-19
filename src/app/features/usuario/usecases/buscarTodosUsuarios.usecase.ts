import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarTodosUsuariosUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(): Promise<any | Error> {
    const result = await this.repository.getAll();

    if (!result) {
      return Error;
    }

    return result;
  }
}
