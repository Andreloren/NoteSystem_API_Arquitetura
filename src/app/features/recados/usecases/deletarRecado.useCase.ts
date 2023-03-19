import { UsuarioRepository } from "../../usuario/repositories/usuario.repository";
import { RecadoRepository } from "../repositories/recados.repository";

export class DeletarRecadoUsecase {
  constructor(private repository: RecadoRepository) {}

  public async execute(recadoId: string, usuarioId: number): Promise<any> {
    const result = await this.repository.delete(recadoId, usuarioId);

    if (!result) {
      return Error;
    }

    return result;
  }
}
