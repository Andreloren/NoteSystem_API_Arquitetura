import { NextFunction, Request, Response } from "express";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { HttpHelper } from "../../../shared/utils/http.helper";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { BuscarUsuarioPorIdfUsecase } from "../usecases/buscarUsuarioPorId.usecase";

export const buscarUsuarioPorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usuarioId } = req.params;

    const usecase = new BuscarUsuarioPorIdfUsecase(
      new UsuarioRepository(),
      new CacheRepository()
    );

    const result = await usecase.execute(Number(usuarioId));

    if (!result) {
      return HttpHelper.badRequest(res, "Nenhum usuário localizado", 409);
    }
    return next();
  } catch (error: any) {
    return HttpHelper.error(res, "Server not found");
  }
};
