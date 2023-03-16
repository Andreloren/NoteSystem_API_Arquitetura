import { Request, Response } from "express";
import { BuscarRecadoPorIdService } from "../services/buscarRecadoporIdService";

export class BuscarRecadoPorIdController {
  async buscar(req: Request, res: Response) {
    const { usuarioId, recadoId } = req.params;

    try {
      const service = new BuscarRecadoPorIdService();

      const result = await service.execute(Number(usuarioId), recadoId);

      if (result instanceof Error) {
        return res.status(400).json({ mensagem: result.message });
      }

      return res.status(200).json({
        mensagem: "Recado encontrado com sucesso",
        data: result.recados,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
