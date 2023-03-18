import { Response } from "express";

export class HttpHelper {
  public static sucess(
    res: Response,
    data: any,
    mensagem?: string,
    code?: number
  ) {
    return res.status(code ?? 200).send({
      mensagem,
      data,
    });
  }

  public static error(res: Response, mensagem?: string, code?: number) {
    return res.status(code ?? 500).send({
      mensagem,
    });
  }

  public static badRequest(res: Response, mensagem?: string, code?: number) {
    return res.status(code ?? 400).send({
      mensagem,
    });
  }
}
