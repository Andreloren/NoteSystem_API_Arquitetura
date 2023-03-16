import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarPorCpfUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(cpf: string) {
    const result = await this.repository.getByCpf(cpf);

    if (!result) {
      return null;
    }
    return result;
  }
}
