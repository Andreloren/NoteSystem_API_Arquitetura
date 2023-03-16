import { NextFunction, Request, Response } from "express";

export const validarCamposRecado = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { descricao, detalhamento } = req.body;

  if (!descricao) {
    return res.status(400).json({
      mensagem: "Campo Descrição é obrigatório.",
    });
  }

  if (!detalhamento) {
    return res.status(400).json({
      mensagem: "Campo Detalhamento é obrigatório.",
    });
  }

  next();
};
