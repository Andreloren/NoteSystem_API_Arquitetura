import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Recado } from "../../../models/recado.model";
import { RecadosEntity } from "../../../shared/database/entities/recados.entity";

export class RecadoRepository {
  private _repository =
    DatabaseConnection.connection.getRepository(RecadosEntity);

  private mapToModel(entity: RecadosEntity) {
    return Recado.create(
      entity.descricao,
      entity.detalhamento,
      entity.usuarioId,
      entity.status,
      entity.recadoId
    );
  }

  public async create(recado: RecadosEntity): Promise<Recado | any> {
    const recadoEntity = this._repository.create({
      recadoId: recado.recadoId,
      status: recado.status,
      descricao: recado.descricao,
      detalhamento: recado.detalhamento,
      usuarioId: recado.usuarioId,
    });

    const result = await this._repository.save(recadoEntity);

    return this.mapToModel(result);
  }

  public async update(
    recadoId: string,
    usuarioId: number,
    descricao: string,
    detalhamento: string,
    status: string
  ): Promise<any | Error> {
    const recadoAtualizado = await this._repository.findOne({
      relations: ["usuario"],
      where: { recadoId, usuario: { usuarioId: Number(usuarioId) } },
    });

    if (!recadoAtualizado) {
      return new Error("Recado não existe");
    }

    recadoAtualizado!.descricao = descricao
      ? descricao
      : recadoAtualizado!.descricao;
    recadoAtualizado!.detalhamento = detalhamento
      ? detalhamento
      : recadoAtualizado!.detalhamento;
    recadoAtualizado!.status = status ? status : recadoAtualizado!.status;

    const result = await this._repository.save(recadoAtualizado!);

    return this.mapToModel(result);
  }

  public async delete(
    recadoId: string,
    usuarioId: number
  ): Promise<Recado | Error> {
    const recado = await this._repository.findOne({
      relations: ["usuario"],
      where: { recadoId, usuario: { usuarioId: Number(usuarioId) } },
    });

    if (!recado) {
      return new Error("Recado não existe");
    }

    await this._repository.delete(recadoId!);

    return this.mapToModel(recado);
  }
}
