import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/utils/http.helper";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { BuscarPorEmailUsecase } from "../usecases/buscarPorEmail.usecase";

export const checkEmailDuplicadoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const usecase = new BuscarPorEmailUsecase(new UsuarioRepository());

    const result = await usecase.execute(email);

    if (!result) {
      return next();
    }
    return HttpHelper.badRequest(res, "Email já cadastrado", 409);
  } catch (error: any) {
    return HttpHelper.error(res, "Server not found");
  }
};
