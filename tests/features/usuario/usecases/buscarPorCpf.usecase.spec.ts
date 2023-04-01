import { UsuarioRepository } from "../../../../src/app/features/usuario/repositories/usuario.repository";
import { Usuario } from "../../../../src/app/models/usuario.model";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { BuscarPorCpfUsecase } from "../../../../src/app/features/usuario/usecases/buscarPorCpf.usecase";

describe("Get by CPF", () => {
  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await RedisConnection.destroy();
    await DatabaseConnection.destroy();
  });

  const makeSut = () => {
    return new BuscarPorCpfUsecase(new UsuarioRepository());
  };

  test("Should search for user by CPF", async () => {
    const usuario = new Usuario(
      "Teste",
      "teste@teste.com",
      "111.111.111-11",
      "1234567"
    );

    jest
      .spyOn(UsuarioRepository.prototype, "getByCpf")
      .mockResolvedValueOnce(usuario);

    const sut = makeSut();
    const result = await sut.execute("cpf-valido");

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("cpf");
  });

  test("It should return null if there is no user", async () => {
    jest
      .spyOn(UsuarioRepository.prototype, "getByCpf")
      .mockResolvedValueOnce(null);

    const sut = makeSut();
    const result = await sut.execute("cpf-invalido");

    expect(result).toBeNull();
  });
});
