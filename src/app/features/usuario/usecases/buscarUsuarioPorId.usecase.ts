import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarUsuarioPorIdfUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(usuarioId: number): Promise<any | Error> {
    const result = await this.repository.getByUsuarioId(usuarioId);

    if (!result) {
      return Error;
    }
    return result;
  }
}
