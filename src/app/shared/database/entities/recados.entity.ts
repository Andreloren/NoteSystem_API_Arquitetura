import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { UsuariosEntity } from "./usuarios.entity";

@Entity({ name: "recados" })
export class RecadosEntity {
  @PrimaryGeneratedColumn("uuid")
  recadoId?: string;

  @Column()
  status?: string;

  @Column()
  descricao!: string;

  @Column()
  detalhamento!: string;

  @Column()
  usuarioId!: number;

  @CreateDateColumn({ name: "create_at" })
  createRecado?: Date;

  @Column({ name: "update_at" })
  updateRecado?: Date;

  @ManyToOne(() => UsuariosEntity, (fkusuario) => fkusuario.recados)
  @JoinColumn({ name: "usuarioId", referencedColumnName: "usuarioId" })
  usuario?: UsuariosEntity;

  @BeforeInsert()
  setCreatedAt?() {
    this.createRecado = new Date();
  }

  @BeforeUpdate()
  beforeUpdate?() {
    this.updateRecado = new Date();
  }
}
