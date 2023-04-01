import { Recado } from "../../../../src/app/models/recado.model";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.repository";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { RecadoRepository } from "../../../../src/app/features/recados/repositories/recados.repository";
import { AtualizarRecadoUseCase } from "../../../../src/app/features/recados/usecases/atualizarRecado.usecase";

describe("update a message", () => {
  const recadoAtualizado = new Recado(
    "Teste",
    "Recado",
    1,
    "ativo",
    "id-valido"
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
    const repository = new RecadoRepository();
    const usecase = new AtualizarRecadoUseCase(repository, cache);

    return {
      sut: usecase,
      repository,
      cache,
    };
  };

  test("Should return an updated message", async () => {
    const { sut } = makeSut();
    jest
      .spyOn(RecadoRepository.prototype, "update")
      .mockResolvedValue(recadoAtualizado);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute({
      recadoId: recadoAtualizado.recadoId!,
      usuarioId: recadoAtualizado.usuarioId,
      descricao: recadoAtualizado.descricao,
      detalhamento: recadoAtualizado.detalhamento,
      status: recadoAtualizado.status!,
    });

    expect(result).toBeDefined();
    expect(result).toEqual({
      recadoId: recadoAtualizado.recadoId!,
      usuarioId: recadoAtualizado.usuarioId,
      descricao: recadoAtualizado.descricao,
      detalhamento: recadoAtualizado.detalhamento,
      status: recadoAtualizado.status!,
    });
  });

  test("Should return Error for message", async () => {
    const { sut } = makeSut();
    jest.spyOn(RecadoRepository.prototype, "update").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

    const result = await sut.execute({
      recadoId: recadoAtualizado.recadoId!,
      usuarioId: 2,
      descricao: recadoAtualizado.descricao,
      detalhamento: recadoAtualizado.detalhamento,
      status: recadoAtualizado.status!,
    });

    expect(result).toBe(Error);
  });
});
