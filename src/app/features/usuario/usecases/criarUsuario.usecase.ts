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
  private cacheKey = "USER_CREATE";

  constructor(
    private repository: UsuarioRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: CriarUsuarioDTO): Promise<Usuario | any> {
    await this.cacheRepository.del(this.cacheKey);

    const cache = await this.cacheRepository.get(this.cacheKey);

    if (cache) {
      return cache as any[];
    }

    const usuario = new Usuario(data.nome, data.email, data.cpf, data.senha);

    const result = await this.repository.create(usuario);

    await this.cacheRepository.set(this.cacheKey, result);

    return result;
  }
}
