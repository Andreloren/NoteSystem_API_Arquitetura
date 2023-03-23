import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarTodosUsuariosUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(): Promise<any | Error> {
    const result = await this.repository.getAll();

    const cacheRepository = new CacheRepository();

    const cache: any[] = await cacheRepository.get("LIST_USERS");

    if (cache) {
      return cache;
    }

    if (!result) {
      return Error;
    }

    await cacheRepository.setEX("LIST_USERS", result, 300);

    return result;
  }
}
