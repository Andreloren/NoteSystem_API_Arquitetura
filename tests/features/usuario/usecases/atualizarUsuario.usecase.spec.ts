import { UsuarioRepository } from "../../../../src/app/features/usuario/repositories/usuario.repository";
import { Usuario } from "../../../../src/app/models/usuario.model";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.repository";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { AtualizarUsuarioUseCase } from "../../../../src/app/features/usuario/usecases/atualizarUsuario.usecase";

describe("update a user", () => {
  const usuarioAtualizado = new Usuario(
    "NovoTeste",
    "teste@teste.com",
    "111.111.111-11",
    "1234567",
    1
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
    const usecase = new AtualizarUsuarioUseCase(repository, cache);

    return {
      sut: usecase,
      repository,
      cache,
    };
  };

  test("Should return an updated user", async () => {
    const { sut } = makeSut();
    jest
      .spyOn(UsuarioRepository.prototype, "update")
      .mockResolvedValue(usuarioAtualizado);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute(usuarioAtualizado);

    expect(result).toBeDefined();
    expect(result).toBe(usuarioAtualizado);
  });

  test("Should return null for user", async () => {
    const { sut } = makeSut();
    jest.spyOn(UsuarioRepository.prototype, "update").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute(usuarioAtualizado);

    expect(result).toBe(Error);
  });
});
