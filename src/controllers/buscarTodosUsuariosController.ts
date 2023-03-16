import { Request, Response } from "express";

import { BuscarTodosUsuariosService } from "../services/buscarTodosUsuariosService";

export class BuscarTodosUsuariosController {
  async buscar(req: Request, res: Response) {
    try {
      const service = new BuscarTodosUsuariosService();

      const result = await service.execute();

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
