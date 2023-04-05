import { BuscarUsuarioPorIdfUsecase } from "../../../../src/app/features/usuario/usecases/buscarUsuarioPorId.usecase";
import { Usuario } from "../../../../src/app/models/usuario.model";
import { createServer } from "../../../../src/main/config/server.config";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import request from "supertest";

describe("Route to list by ID", () => {
  const usuario = new Usuario(
    "Usuario Teste",
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

  const server = createServer();

  test("Should return error 400 when searching for a non-existent user by ID", async () => {
    jest
      .spyOn(BuscarUsuarioPorIdfUsecase.prototype, "execute")
      .mockResolvedValue(usuario);

    const result = await request(server).get("/usuarios:usuarioId").send({
      //   nome: "Usuario Teste",
      //   email: "teste@teste.com",
      //   cpf: "111.111.111-11",
      //   senha: "1234567",
      usuarioId: 2,
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(404);
  });
});
