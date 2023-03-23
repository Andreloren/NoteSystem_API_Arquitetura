import { Usuario } from "../../../models/usuario.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";

interface CriarUsuarioDTO {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

export class CriarUsuarioUseCase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(data: CriarUsuarioDTO): Promise<Usuario> {
    const usuario = new Usuario(data.nome, data.email, data.cpf, data.senha);

    const cacheRepository = new CacheRepository();

    await cacheRepository.del("LIST_USERS");

    await cacheRepository.del("LIST_USER");

    await cacheRepository.setEX("LIST_USER", [usuario], 3600);

    const result = await this.repository.create(usuario);

    return result;
  }
}
