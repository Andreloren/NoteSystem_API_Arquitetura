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

    const usuario = new Usuario(data.nome, data.email, data.cpf, data.senha);

    const cache: any[] = await this.cacheRepository.get("ALL_USERS");

    const result = await this.repository.create(usuario);

    await this.cacheRepository.set(this.cacheKey, result);
    await this.cacheRepository.set("ALL_USERS", [...cache, result]);

    return result;
  }
}
