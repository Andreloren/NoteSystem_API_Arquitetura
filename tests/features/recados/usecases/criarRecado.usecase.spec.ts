import { Recado } from "../../../../src/app/models/recado.model";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.repository";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { RecadoRepository } from "../../../../src/app/features/recados/repositories/recados.repository";
import { CriarRecadosUseCase } from "../../../../src/app/features/recados/usecases/criarRecados.usecase";

describe("create a message", () => {
  const recado = new Recado("Teste", "Recado", 1);

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
    const repository = new RecadoRepository();
    const usecase = new CriarRecadosUseCase(repository, cache);

    return {
      sut: usecase,
      repository,
      cache,
    };
  };

  test("Should return a created message", async () => {
    const { sut } = makeSut();

    jest.spyOn(RecadoRepository.prototype, "create").mockResolvedValue(recado);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue([recado]);

    const result = await sut.execute(recado);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBe(recado);
  });
});
