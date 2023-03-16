import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RecadosEntity } from "./recados.entity";

@Entity({ name: "usuario" })
export class UsuariosEntity {
  @PrimaryGeneratedColumn({ name: "usuario_id" })
  usuarioId!: number;

  @Column({ type: "text" })
  nome!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", unique: true })
  cpf!: string;

  @Column({ type: "text" })
  senha!: string;

  @CreateDateColumn({ name: "create_user_at", type: "timestamp" })
  createUser!: Date;

  @Column({ name: "update_user_at", type: "timestamp", nullable: true })
  updateUser?: Date;

  @OneToMany(() => RecadosEntity, (fkrecados) => fkrecados.usuario)
  @JoinColumn({ name: "recadoId", referencedColumnName: "recadoId" })
  recados!: RecadosEntity[];

  @BeforeUpdate()
  beforeUpdate() {
    this.updateUser = new Date();
  }
}
