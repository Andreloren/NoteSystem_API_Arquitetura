import { Response, Request } from "express";
import { HttpHelper } from "../../../shared/utils/http.helper";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { AtualizarUsuarioUseCase } from "../usecases/atualizarUsuario.usecase";
import { BuscarRecadosPorUsuarioUsecase } from "../usecases/buscarRecadosPorUsuario.usecase";
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

  public async update(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;
      const { nome, email, cpf, senha } = req.body;

      const useCase = new AtualizarUsuarioUseCase(new UsuarioRepository());

      const result = await useCase.execute({
        usuarioId: Number(usuarioId),
        nome,
        email,
        cpf,
        senha,
      });

      return HttpHelper.sucess(
        res,
        result,
        "Usuario atualizado com Sucesso",
        201
      );
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

  public async listRecadosByUsuarioId(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;
      const { filter } = req.query;

      const useCase = new BuscarRecadosPorUsuarioUsecase(
        new UsuarioRepository()
      );

      const result = await useCase.execute(Number(usuarioId));

      if (filter) {
        return res.status(200).json({
          mensagem: "Recado encontrado com sucesso",
          data: result
            ?.recados!.filter(
              (f: { descricao: string; detalhamento: string }) =>
                f.descricao
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase()) ||
                f.detalhamento
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase())
            )
            .map((m) => {
              return {
                createRecado: m.createRecado,
                descricao: m.descricao,
                detalhamento: m.detalhamento,
                recadoId: m.recadoId,
                status: m.status,
                usuarioId: m.usuarioId,
                updateRecado: m.updateRecado,
              };
            }),
        });
      } else {
        return HttpHelper.sucess(res, result!.recados);
      }
    } catch (error) {
      return HttpHelper.error(res, "Server not found");
    }
  }
}
