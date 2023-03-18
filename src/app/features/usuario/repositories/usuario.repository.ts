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

    return result;
  }

  public async update(
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    usuarioId?: number
  ): Promise<Usuario> {
    const usuarioAtualizado = await this._repository.findOneBy({ usuarioId });

    usuarioAtualizado!.nome = nome ? nome : usuarioAtualizado!.nome;
    usuarioAtualizado!.email = email ? email : usuarioAtualizado!.email;
    usuarioAtualizado!.senha = senha ? senha : usuarioAtualizado!.senha;

    const result = await this._repository.save(usuarioAtualizado!);

    return result;
  }

  public async getByUsuarioId(usuarioId: number) {
    const result = await this._repository.findOneBy({ usuarioId });

    if (!result) {
      return null;
    }
    return this.mapToModel(result);
  }

  public async getByCpf(cpf: string) {
    const result = await this._repository.findOneBy({ cpf });

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

  public async getAllRecadosByIdUsuario(usuarioId: number): Promise<any> {
    const result = await this._repository.findOne({
      where: { usuarioId: usuarioId },
      relations: ["recados"],
    });

    if (!result) {
      return null;
    }

    return result;
  }

  public async getOneRecadoByIdUsuario(
    usuarioId: number,
    recadoId: string
  ): Promise<any> {
    const result = await this._repository.findOne({
      relations: ["recados"],
      where: { usuarioId, recados: { recadoId: recadoId } },
    });
    const recado = result?.recados?.filter((f) => f.recadoId === recadoId);

    if (recado?.length === 0 || !recado) {
      return null;
    }

    return result;
  }

  // public async updateRecado(
  //   recadoId: string,
  //   usuarioId: number,
  //   descricao: string,
  //   detalhamento: string,
  //   status: string
  // ): Promise<any> {
  //   const recadoAtualizado = await this._repository.findOne({
  //     relations: ["recados"],
  //     where: { usuarioId, recados: { recadoId: recadoId } },
  //   });

  //   recadoAtualizado!.descricao = descricao
  //     ? descricao
  //     : recadoAtualizado!.descricao;
  //   recadoAtualizado!.detalhamento = detalhamento
  //     ? detalhamento
  //     : recadoAtualizado!.detalhamento;
  //   recadoAtualizado!.status = status ? status : recadoAtualizado!.status;

  //   const result = await this._repository.save(recadoAtualizado!);

  //   return result;
  // }
}
