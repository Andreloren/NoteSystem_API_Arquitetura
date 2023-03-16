import { Request, Response } from "express";
import { CriarUsuarioService } from "../services/criarUsuarioService";

export class CriarUsuarioController {
  async criar(req: Request, res: Response) {
    const { nome, email, cpf, senha } = req.body;

    try {
      const service = new CriarUsuarioService();

      const result = await service.execute({ nome, email, cpf, senha });

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(201).json({
        mensagem: "Usuario criado com sucesso",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
