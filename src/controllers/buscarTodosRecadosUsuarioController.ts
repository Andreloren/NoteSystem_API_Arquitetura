import { Request, Response } from "express";
import { BuscarTodosRecadosUsuarioService } from "../services/buscarTodosRecadosUsuarioService";
import { status } from "../app/shared/types/tipos";

export class BuscarTodosRecadosUsuarioController {
  async buscar(req: Request, res: Response) {
    const { usuarioId } = req.params;
    const { filter } = req.query;

    try {
      const service = new BuscarTodosRecadosUsuarioService();

      const result = await service.execute(Number(usuarioId));

      if (result instanceof Error) {
        return res.status(400).json({ mensagem: result.message });
      }

      if (filter) {
        return res.status(200).json({
          mensagem: "Recado encontrado com sucesso",
          data: result!.recados
            .filter(
              (f: { descricao: string; detalhamento: string }) =>
                f.descricao
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase()) ||
                f.detalhamento
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase())
            )
            .map(
              (m: {
                createRecado: string;
                descricao: string;
                detalhamento: string;
                recadoId: string;
                status: status;
                updateRecado: string | null;
              }) => {
                return {
                  createRecado: m.createRecado,
                  descricao: m.descricao,
                  detalhamento: m.detalhamento,
                  recadoId: m.recadoId,
                  status: m.status,
                  updateRecado: m.updateRecado,
                };
              }
            ),
        });
      } else {
        return res.status(200).json({
          mensagem: "Recados encontrados com sucesso",
          data: result.recados,
        });
      }
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
