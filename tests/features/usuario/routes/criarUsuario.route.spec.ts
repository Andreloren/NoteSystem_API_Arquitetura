import { Usuario } from "../../../../src/app/models/usuario.model";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { BuscarPorCpfUsecase } from "../../../../src/app/features/usuario/usecases/buscarPorCpf.usecase";
import { BuscarPorEmailUsecase } from "../../../../src/app/features/usuario/usecases/buscarPorEmail.usecase";

describe("Route to create a user", () => {
  const usuario = new Usuario(
    "Usuario Teste",
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

  const server = createServer();

  test("Should return error 409 when trying to insert CPF already registered", async () => {
    jest
      .spyOn(BuscarPorCpfUsecase.prototype, "execute")
      .mockResolvedValue(usuario);

    const result = await request(server).post("/usuarios").send({
      nome: "Usuario Teste2",
      email: "teste2@teste.com",
      cpf: "111.111.111-11",
      senha: "1234567",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(409);
  });

  test("Should return error 409 when trying to insert email already registered", async () => {
    jest
      .spyOn(BuscarPorEmailUsecase.prototype, "execute")
      .mockResolvedValue(usuario);

    const result = await request(server).post("/usuarios").send({
      nome: "Usuario Teste2",
      email: "teste@teste.com",
      cpf: "110.111.111-11",
      senha: "1234567",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(409);
  });

  test("Should return error 400 when trying to insert without Name", async () => {
    const result = await request(server).post("/usuarios").send({
      email: "teste@teste.com",
      cpf: "111.111.111-11",
      senha: "1234567",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(result.body.mensagem).toBe("Campo Nome é obrigatório.");
  });

  test("Should return error 400 when trying to insert without CPF", async () => {
    const result = await request(server).post("/usuarios").send({
      nome: "Usuario Teste",
      email: "teste@teste.com",
      senha: "1234567",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(result.body.mensagem).toBe("Campo CPF é obrigatório.");
  });

  test("Should return error 400 when trying to insert without Email", async () => {
    const result = await request(server).post("/usuarios").send({
      nome: "Usuario Teste",
      cpf: "111.111.111-11",
      senha: "1234567",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(result.body.mensagem).toBe("Campo E-mail é obrigatório.");
  });

  test("Should return error 400 when trying to insert without Password", async () => {
    const result = await request(server).post("/usuarios").send({
      nome: "Usuario Teste",
      cpf: "111.111.111-11",
      email: "teste@teste.com",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(result.body.mensagem).toBe("Campo Senha é obrigatório.");
  });
});
