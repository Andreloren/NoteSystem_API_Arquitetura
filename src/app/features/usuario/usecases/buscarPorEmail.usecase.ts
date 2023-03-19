import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarPorEmailUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(email: string) {
    const result = await this.repository.getByEmail(email);

    if (!result) {
      return null;
    }
    return result;
  }
}
