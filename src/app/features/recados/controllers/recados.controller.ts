import { Response, Request } from "express";
import { HttpHelper } from "../../../shared/utils/http.helper";
import { RecadoRepository } from "../repositories/recados.repository";
import { AtualizarRecadoUseCase } from "../usecases/atualizarRecado.usecase";
import { CriarRecadosUseCase } from "../usecases/criarRecados.usecase";
import { DeletarRecadoUsecase } from "../usecases/deletarRecado.useCase";

export class RecadosController {
  public async create(req: Request, res: Response) {
    try {
      const { descricao, detalhamento } = req.body;
      const { usuarioId } = req.params;

      const useCase = new CriarRecadosUseCase(new RecadoRepository());

      const result = await useCase.execute({
        usuarioId: Number(usuarioId),
        descricao,
        detalhamento,
      });
      console.log(result);

      return HttpHelper.sucess(res, result, "Recado criado com Sucesso", 201);
    } catch (error) {
      return HttpHelper.error(res, "Server not found");
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { usuarioId, recadoId } = req.params;
      const { descricao, detalhamento, status } = req.body;

      const useCase = new AtualizarRecadoUseCase(new RecadoRepository());

      const result = await useCase.execute({
        recadoId,
        usuarioId: Number(usuarioId),
        descricao,
        detalhamento,
        status,
      });

      if (result instanceof Error) {
        return res.status(400).json({ mensagem: result.message });
      }

      if (result.status !== "ativo" && result.status !== "arquivado") {
        return res
          .status(401)
          .json({ mensagem: "Permitido Status ATIVO ou ARQUIVADO" });
      }

      if (!descricao && !detalhamento && !status) return res.status(304).end();

      return HttpHelper.sucess(
        res,
        result,
        "Recado atualizado com Sucesso",
        200
      );
    } catch (error) {
      return HttpHelper.error(res, "Server not found");
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { recadoId, usuarioId } = req.params;

      const useCase = new DeletarRecadoUsecase(new RecadoRepository());

      const result = await useCase.execute(recadoId, Number(usuarioId));

      if (result instanceof Error) {
        return res.status(400).json({ mensagem: result.message });
      }

      return HttpHelper.sucess(res, result, "Recado deletado com Sucesso", 200);
    } catch (error) {
      return HttpHelper.error(res, "Server not found");
    }
  }
}
