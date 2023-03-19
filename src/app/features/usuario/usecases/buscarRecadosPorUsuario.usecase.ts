import { Recado } from "../../../models/recado.model";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarRecadosPorUsuarioUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(usuarioId: number): Promise<any | Error> {
    const result = await this.repository.getAllRecadosByIdUsuario(usuarioId);

    if (!result) {
      return Error;
    }

    return result;
  }
}
