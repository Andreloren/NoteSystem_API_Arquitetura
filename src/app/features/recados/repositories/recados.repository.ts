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

  public async create(recado: RecadosEntity): Promise<Recado> {
    const recadoEntity = this._repository.create({
      recadoId: recado.recadoId,
      status: recado.status,
      descricao: recado.descricao,
      detalhamento: recado.detalhamento,
      usuarioId: recado.usuarioId,
    });

    const result = await this._repository.save(recadoEntity);

    return result;
  }
}
