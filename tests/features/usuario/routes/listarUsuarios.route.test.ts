import { UsuarioRepository } from "../../../../src/app/features/usuario/repositories/usuario.repository";
import { BuscarTodosUsuariosUsecase } from "../../../../src/app/features/usuario/usecases/buscarTodosUsuarios.usecase";
import { Usuario } from "../../../../src/app/models/usuario.model";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.repository";
import { createServer } from "../../../../src/main/config/server.config";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../src/main/database/typeorm.connection";
import request from "supertest";

describe("Route to list all integration", () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const server = createServer();

  test("Should return status 200 if listing is successful", async () => {
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
    const usuarioRepository = new UsuarioRepository();
    await usuarioRepository.create(usuario);

    const result = await request(server).get("/usuarios").send();

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("data");
    expect((result.body.data as any[]).length).toBeGreaterThan(0);
  });
});
