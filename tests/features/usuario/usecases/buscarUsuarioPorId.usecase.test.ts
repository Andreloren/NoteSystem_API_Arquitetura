import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { BuscarUsuarioPorIdfUsecase } from "../../../../src/app/features/usuario/usecases/buscarUsuarioPorId.usecase";
import { UsuarioRepository } from "../../../../src/app/features/usuario/repositories/usuario.repository";
import { native } from "pg";
import { Usuario } from "../../../../src/app/models/usuario.model";

describe("Get user by ID usecase test", () => {
  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await RedisConnection.destroy();
    await DatabaseConnection.destroy();
  });

  const makeSut = () => {
    return new BuscarUsuarioPorIdfUsecase(new UsuarioRepository());
  };

  test("It should return ERROR when the user does not exist", async () => {
    jest
      .spyOn(UsuarioRepository.prototype, "getByUsuarioId")
      .mockResolvedValueOnce(null);

    const sut = makeSut();
    const result = await sut.execute(2);

    expect(result).toBe(Error);
  });

  test("Should return a valid user if ID exists", async () => {
    const usuario = new Usuario(
      "Teste",
      "teste@teste.com",
      "111.111.111-11",
      "1234567"
    );

    jest
      .spyOn(UsuarioRepository.prototype, "getByUsuarioId")
      .mockResolvedValueOnce(usuario);

    const sut = makeSut();
    const result = await sut.execute(1);

    expect(result).not.toBe(Error);
    expect(result).toHaveProperty("usuarioId");
    expect(result).toHaveProperty("cpf");
    expect(result).toHaveProperty("email");
    expect(result!.usuarioId).toBe(usuario.usuarioId);
  });
});
