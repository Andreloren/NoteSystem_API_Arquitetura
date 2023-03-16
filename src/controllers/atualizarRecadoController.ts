import { Request, Response } from "express";
import { AtualizaRecadoService } from "../services/atualizarRecadoService";

export class AtualizarRecadoController {
  async atualizar(req: Request, res: Response) {
    const { usuarioId, recadoId } = req.params;
    const { descricao, detalhamento, status } = req.body;

    try {
      const service = new AtualizaRecadoService();

      const result = await service.execute({
        recadoId,
        usuarioId: Number(usuarioId),
        descricao,
        detalhamento,
        status,
      });

      if (!descricao && !detalhamento && !status) return res.status(304).end();

      if (result instanceof Error) {
        return res.status(400).json({ mensagem: result.message });
      }

      return res.status(200).json({
        mensagem: "Recado atualizado com sucesso",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
