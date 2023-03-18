import { Response, Request } from "express";
import { HttpHelper } from "../../../shared/utils/http.helper";
import { RecadoRepository } from "../repositories/recados.repository";
import { BuscarRecadosPorUsuarioUsecase } from "../../usuario/usecases/buscarRecadosPorUsuario.usecase";
import { CriarRecadosUseCase } from "../usecases/criarRecados.usecase";

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
}
