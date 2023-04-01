import { UsuarioRepository } from "../../../../src/app/features/usuario/repositories/usuario.repository";
import { Usuario } from "../../../../src/app/models/usuario.model";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.repository";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { CriarUsuarioUseCase } from "../../../../src/app/features/usuario/usecases/criarUsuario.usecase";

describe("create a user", () => {
  const usuario = new Usuario(
    "Teste",
    "teste@teste.com",
    "111.111.111-11",
    "1234567"
  );

  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await RedisConnection.destroy();
    await DatabaseConnection.destroy();
  });

  const makeSut = () => {
    const cache = new CacheRepository();
    const repository = new UsuarioRepository();
    const usecase = new CriarUsuarioUseCase(repository, cache);

    return {
      sut: usecase,
      repository,
      cache,
    };
  };

  test("Should return a created user", async () => {
    const { sut } = makeSut();
    jest
      .spyOn(UsuarioRepository.prototype, "create")
      .mockResolvedValue(usuario);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue([usuario]);

    const result = await sut.execute(usuario);

    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue(result);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBe(usuario);
  });
});
