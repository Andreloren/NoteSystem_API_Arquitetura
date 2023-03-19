import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarRecadoPorIdUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(usuarioId: number, recadoId: string): Promise<any> {
    const result = await this.repository.getOneRecadoByIdUsuario(
      usuarioId,
      recadoId
    );

    if (!result) {
      return Error;
    }

    return result;
  }
}
