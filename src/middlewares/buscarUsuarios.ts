import { NextFunction, Request, Response } from "express";

import { usuarioRepository } from "../repository/usuariosRepository";

export const buscarUsuarios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((await usuarioRepository.count()) === 0) {
    return res.status(404).json({
      mensagem: "Nenhum usuário localizado",
    });
  }

  next();
};
