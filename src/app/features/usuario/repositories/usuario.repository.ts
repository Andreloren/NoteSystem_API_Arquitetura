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

  public async create(usuario: UsuariosEntity): Promise<Usuario> {
    const usuarioEntity = this._repository.create({
      usuarioId: usuario.usuarioId,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha,
    });

    const result = await this._repository.save(usuarioEntity);

    return this.mapToModel(result);
  }

  public async update(
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    usuarioId?: number
  ): Promise<Usuario | any> {
    const usuarioAtualizado = await this._repository.findOneBy({ usuarioId });

    if (!usuarioAtualizado) {
      return new Error("Usuário não cadastrado");
    }

    usuarioAtualizado!.nome = nome ? nome : usuarioAtualizado!.nome;
    usuarioAtualizado!.email = email ? email : usuarioAtualizado!.email;
    usuarioAtualizado!.senha = senha ? senha : usuarioAtualizado!.senha;

    const result = await this._repository.save(usuarioAtualizado!);

    return this.mapToModel(result);
  }

  public async getByUsuarioId(usuarioId: number): Promise<any | Error> {
    const result = await this._repository.findOneBy({ usuarioId });

    if (!result) {
      return new Error("Usuário não cadastrado");
    }
    return this.mapToModel(result);
  }

  public async getByCpf(cpf: string): Promise<any> {
    const result = await this._repository.findOneBy({ cpf });

    if (!result) {
      return null;
    }
    return this.mapToModel(result);
  }

  public async getByEmail(email: string): Promise<any> {
    const result = await this._repository.findOneBy({ email });

    if (!result) {
      return null;
    }
    return this.mapToModel(result);
  }

  public async getAll(): Promise<any | Error> {
    const result = await this._repository.find();

    if (result?.length === 0) {
      return new Error("Não existem Usuários cadastrados");
    }

    return result.map((usuario) => this.mapToModel(usuario));
  }

  public async getAllRecadosByIdUsuario(
    usuarioId: number
  ): Promise<any | Error> {
    const result = await this._repository.findOne({
      where: { usuarioId: usuarioId },
      relations: ["recados"],
    });

    if (result?.recados?.length === 0) {
      return new Error("Não existem recados para este Usuário");
    }

    return result;
  }

  public async getOneRecadoByIdUsuario(
    usuarioId: number,
    recadoId: string
  ): Promise<any | Error> {
    const result = await this._repository.findOne({
      relations: ["recados"],
      where: { usuarioId, recados: { recadoId: recadoId } },
    });
    const recado = result?.recados?.filter((f) => f.recadoId === recadoId);

    if (recado?.length === 0 || !recado) {
      return new Error("Recado não existe");
    }

    return result;
  }
}
