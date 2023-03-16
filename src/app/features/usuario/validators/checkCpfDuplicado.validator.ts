import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/utils/http.helper";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { BuscarPorCpfUsecase } from "../usecases/buscarPorCpf.usecase";

export const checkCpfDuplicadoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cpf } = req.body;

    const usecase = new BuscarPorCpfUsecase(new UsuarioRepository());

    const result = await usecase.execute(cpf);

    if (!result) {
      return next();
    }
    return HttpHelper.badRequest(res, "CPF já cadastrado", 409);
  } catch (error: any) {
    return HttpHelper.error(res, "Server not found");
  }
};
