import { Request, Response } from "express";
import { usuarioRepository } from "../repository/usuariosRepository";
import { CriarRecadoUsuarioService } from "../services/criarRecadoUsuarioService";

export class CriarRecadoUsuarioController {
  async criar(req: Request, res: Response) {
    const { descricao, detalhamento } = req.body;
    const { usuarioId } = req.params;

    try {
      const usuario = await usuarioRepository.findOneBy({
        usuarioId: Number(usuarioId),
      });

      const service = new CriarRecadoUsuarioService();

      const result = await service.execute({
        descricao,
        detalhamento,
        usuario: usuario!,
      });

      return res.status(201).json({
        mensagem: "Recado criado com sucesso",
        data: {
          usuarioId: result.usuario.usuarioId,
          descricao: result.descricao,
          detalhamento: result.detalhamento,
          status: result.status,
          recadoId: result.recadoId,
          createRecado: result.createRecado,
        },
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
