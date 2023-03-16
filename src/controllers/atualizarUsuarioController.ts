import { Request, Response } from "express";
import { AtualizarUsuarioService } from "../services/atualizarUsuarioService";

export class AtualizarUsuarioController {
  async atualizar(req: Request, res: Response) {
    const { usuarioId } = req.params;
    const { nome, email, senha } = req.body;

    try {
      const service = new AtualizarUsuarioService();

      const result = await service.execute({
        usuarioId: Number(usuarioId),
        nome,
        email,
        senha,
      });

      return res.status(201).json({
        mensagem: "Usuario atualizado com sucesso",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
