import { NextFunction, Request, Response } from "express";

import { usuarioRepository } from "../repository/usuariosRepository";

export const buscarUsuarioId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { usuarioId } = req.params;

  const usuarioEncontrado = await usuarioRepository.findOneBy({
    usuarioId: Number(usuarioId),
  });

  if (!usuarioEncontrado) {
    return res.status(404).json({
      mensagem: "Nenhum usuário localizado",
    });
  }

  next();
};
