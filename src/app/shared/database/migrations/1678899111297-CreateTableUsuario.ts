import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsuario1678890220060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuario",
        columns: [
          {
            name: "usuario_id",
            type: "int4",
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            primaryKeyConstraintName: "usuario_id",
          },
          {
            name: "nome",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "14",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "senha",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "create_user_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "update_user_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuario", true, true, true);
  }
}
