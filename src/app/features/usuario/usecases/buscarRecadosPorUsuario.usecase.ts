import { Recado } from "../../../models/recado.model";
import { RecadoRepository } from "../../recados/repositories/recados.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarRecadosPorUsuarioUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(usuarioId: number): Promise<Recado | null> {
    const result = await this.repository.getAllRecadosByIdUsuario(usuarioId);

    if (!result) {
      return null;
    }
    console.log(result);

    return result;
  }
}
