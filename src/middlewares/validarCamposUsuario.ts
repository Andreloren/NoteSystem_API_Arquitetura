import { NextFunction, Request, Response } from "express";

export const validarCamposUsuario = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, cpf, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: "Campo Nome é obrigatório.",
    });
  }

  if (!cpf) {
    return res.status(400).json({
      mensagem: "Campo CPF é obrigatório.",
    });
  }

  if (!email) {
    return res.status(400).json({
      mensagem: "Campo E-mail é obrigatório.",
    });
  }

  if (!senha) {
    return res.status(400).json({
      mensagem: "Campo Senha é obrigatório.",
    });
  }

  next();
};
