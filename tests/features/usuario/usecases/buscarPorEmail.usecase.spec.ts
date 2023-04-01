import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { BuscarPorEmailUsecase } from "../../../../src/app/features/usuario/usecases/buscarPorEmail.usecase";
import { UsuarioRepository } from "../../../../src/app/features/usuario/repositories/usuario.repository";
import { Usuario } from "../../../../src/app/models/usuario.model";

describe("Get by email", () => {
  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await RedisConnection.destroy();
    await DatabaseConnection.destroy();
  });

  const makeSut = () => {
    return new BuscarPorEmailUsecase(new UsuarioRepository());
  };

  test("Should search for user by email", async () => {
    const usuario = new Usuario(
      "Teste",
      "teste@teste.com",
      "111.111.111-11",
      "1234567"
    );

    jest
      .spyOn(UsuarioRepository.prototype, "getByEmail")
      .mockResolvedValueOnce(usuario);

    const sut = makeSut();
    const result = await sut.execute("email-valido");

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("email");
  });

  test("It should return null if there is no user", async () => {
    jest
      .spyOn(UsuarioRepository.prototype, "getByEmail")
      .mockResolvedValueOnce(null);

    const sut = makeSut();
    const result = await sut.execute("email-invalido");

    expect(result).toBeNull();
  });
});
