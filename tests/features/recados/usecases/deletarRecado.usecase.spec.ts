import { RecadoRepository } from "../../../../src/app/features/recados/repositories/recados.repository";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.repository";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { DeletarRecadoUsecase } from "../../../../src/app/features/recados/usecases/deletarRecado.useCase";
import { Recado } from "../../../../src/app/models/recado.model";

describe("delete a message", () => {
  const recadoDeletado = new Recado("Teste", "Recado", 1, "ativo", "id-valido");

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
    const usecase = new DeletarRecadoUsecase(repository, cache);

    return {
      sut: usecase,
      repository,
      cache,
    };
  };

  test("Should return a deleted message", async () => {
    const { sut } = makeSut();

    jest
      .spyOn(RecadoRepository.prototype, "delete")
      .mockResolvedValue([recadoDeletado.recadoId, recadoDeletado.usuarioId]);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute(
      recadoDeletado.recadoId!,
      recadoDeletado.usuarioId
    );

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toStrictEqual([
      recadoDeletado.recadoId,
      recadoDeletado.usuarioId,
    ]);
  });

  test("Should return Error for message", async () => {
    const { sut } = makeSut();

    jest.spyOn(RecadoRepository.prototype, "delete").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute("id-invalido", 2);

    expect(result).toBe(Error);
  });
});
