import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRecados1678897560003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recados",
        columns: [
          {
            name: "recado_id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            primaryKeyConstraintName: "recado_id",
          },
          {
            name: "status",
            type: "varchar",
            length: "10",
            isNullable: false,
          },
          {
            name: "descricao",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "detalhamento",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "usuarioId",
            type: "int4",
            isNullable: false,
          },
          {
            name: "create_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "update_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "recados",
            columnNames: ["usuarioId"],
            referencedTableName: "usuario",
            referencedColumnNames: ["usuario_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recados", true, true, true);
  }
}
