import { Response } from "express";

export class HttpHelper {
  public static sucess(
    res: Response,
    data: any,
    message?: string,
    code?: number
  ) {
    return res.status(code ?? 200).send({
      message,
      data,
    });
  }

  public static error(res: Response, message?: string, code?: number) {
    return res.status(code ?? 500).send({
      message,
    });
  }

  public static badRequest(res: Response, message?: string, code?: number) {
    return res.status(code ?? 400).send({
      message,
    });
  }
}
