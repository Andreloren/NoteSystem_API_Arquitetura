import { Request, Response } from "express";
import { DeletarRecadoUsuarioService } from "../services/deletarRecadoUsuarioService";

export class DeletarRecadoUsuarioController {
  async deletar(req: Request, res: Response) {
    const { usuarioId, recadoId } = req.params;

    try {
      const service = new DeletarRecadoUsuarioService();

      const result = await service.execute(recadoId, Number(usuarioId));

      if (result instanceof Error) {
        return res.status(400).json({ mensagem: result.message });
      }

      return res.status(200).json({
        mensagem: "Recado excluído com sucesso",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
