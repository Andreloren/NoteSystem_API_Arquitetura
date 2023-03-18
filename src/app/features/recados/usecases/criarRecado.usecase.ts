import { Recado } from "../../../models/recado.model";
import { UsuariosEntity } from "../../../shared/database/entities/usuarios.entity";
import { RecadosRepository } from "../repositories/recados.repository";

export type CriarRecadoDTO = {
  descricao: string;
  detalhamento: string;
  usuario?: UsuariosEntity;
};

export class CriarRecadoUseCase {
  constructor(private repository: RecadosRepository) {}

  public async execute({
    descricao,
    detalhamento,
    usuario,
  }: CriarRecadoDTO): Promise<Recado> {
    const novoRecado = Recado.create(descricao, detalhamento, usuario!);

    return await this.repository.create(novoRecado);
  }
}
