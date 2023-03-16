import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/utils/http.helper";

export const validarCamposUsuario = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, cpf, email, senha } = req.body;

  if (!nome) {
    return HttpHelper.badRequest(res, "Campo Nome é obrigatório.", 400);
  }

  if (!cpf) {
    return HttpHelper.badRequest(res, "Campo CPF é obrigatório.", 400);
  }

  if (!email) {
    return HttpHelper.badRequest(res, "Campo E-mail é obrigatório.", 400);
  }

  if (!senha) {
    return HttpHelper.badRequest(res, "Campo Senha é obrigatório.", 400);
  }

  next();
};
