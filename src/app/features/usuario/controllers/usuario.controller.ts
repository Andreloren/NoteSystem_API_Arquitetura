import { Response, Request } from "express";
import { HttpHelper } from "../../../shared/utils/http.helper";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { BuscarTodosUsuariosUsecase } from "../usecases/buscarTodosUsuarios.usecase";
import { BuscarUsuarioPorIdfUsecase } from "../usecases/buscarUsuarioPorId.usecase";
import { CriarUsuarioUseCase } from "../usecases/criarUsuario.usecase";

export class UsuarioController {
  public async create(req: Request, res: Response) {
    try {
      const { nome, email, cpf, senha } = req.body;

      const useCase = new CriarUsuarioUseCase(new UsuarioRepository());

      const result = await useCase.execute({ nome, email, cpf, senha });

      return HttpHelper.sucess(res, result, "Usuario criado com Sucesso", 201);
    } catch (error) {
      return HttpHelper.error(res, "Server not found");
    }
  }

  public async listAll(req: Request, res: Response) {
    try {
      const useCase = new BuscarTodosUsuariosUsecase(new UsuarioRepository());

      const result = await useCase.execute();

      return HttpHelper.sucess(res, result);
    } catch (error) {
      return HttpHelper.error(res, "Server not found");
    }
  }

  public async listById(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;

      const useCase = new BuscarUsuarioPorIdfUsecase(new UsuarioRepository());

      const result = await useCase.execute(Number(usuarioId));

      return HttpHelper.sucess(res, result);
    } catch (error) {
      return HttpHelper.error(res, "Server not found");
    }
  }
}
