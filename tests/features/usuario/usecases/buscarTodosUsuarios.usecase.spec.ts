import { UsuarioRepository } from "../../../../src/app/features/usuario/repositories/usuario.repository";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { BuscarTodosUsuariosUsecase } from "../../../../src/app/features/usuario/usecases/buscarTodosUsuarios.usecase";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.repository";
import { Usuario } from "../../../../src/app/models/usuario.model";

describe("Get all users", () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(UsuarioRepository.prototype, "getAll")
      .mockResolvedValue([usuario]);
  });

  const makeSut = () => {
    const cache = new CacheRepository();
    const repository = new UsuarioRepository();
    const usecase = new BuscarTodosUsuariosUsecase(repository, cache);

    return {
      sut: usecase,
      repository,
      cache,
    };
  };

  test("Should return a valid list if there are 1 or more users", async () => {
    const { sut } = makeSut();

    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute();

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });

  test("Should return an empty list when there are no users", async () => {
    const { sut } = makeSut();

    jest.spyOn(UsuarioRepository.prototype, "getAll").mockResolvedValue([]);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute();

    expect(result).toBeDefined();
    expect(result.length).toBe(0);
  });

  test("Should return a cache list when there are no users", async () => {
    const { sut } = makeSut();

    jest.spyOn(UsuarioRepository.prototype, "getAll").mockResolvedValueOnce([]);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue([usuario]);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute();

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });
});
