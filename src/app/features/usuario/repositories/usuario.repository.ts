import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Usuario } from "../../../models/usuario.model";
import { UsuariosEntity } from "../../../shared/database/entities/usuarios.entity";

export class UsuarioRepository {
  private _repository =
    DatabaseConnection.connection.getRepository(UsuariosEntity);

  private mapToModel(entity: UsuariosEntity) {
    return Usuario.create(
      entity.nome,
      entity.email,
      entity.cpf,
      entity.senha,
      entity.usuarioId
    );
  }

  public async create(admin: UsuariosEntity): Promise<Usuario> {
    const usuarioEntity = this._repository.create({
      usuarioId: admin.usuarioId,
      nome: admin.nome,
      email: admin.email,
      cpf: admin.cpf,
      senha: admin.senha,
    });

    const result = await this._repository.save(usuarioEntity);

    return result;
  }

  public async getByUsername(usuarioId: number) {
    const result = await this._repository.findOneBy({ usuarioId });

    if (!result) {
      return null;
    }
    return this.mapToModel(result);
  }

  public async getAll() {
    const result = await this._repository.find();

    if (!result) {
      return null;
    }
    return result.map((usuario) => this.mapToModel(usuario));
  }
}
