import { Request, Response } from "express";
import { BuscarUsuarioPorIDService } from "../services/buscarUsuarioPorIdService";

export class BuscarUsuarioPorIDController {
  async buscar(req: Request, res: Response) {
    const { usuarioId } = req.params;

    try {
      const service = new BuscarUsuarioPorIDService();

      const result = await service.execute(Number(usuarioId));

      return res.status(200).json({
        mensagem: "Dados encontrados com sucesso",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
