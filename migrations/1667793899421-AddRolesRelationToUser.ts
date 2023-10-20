import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddRolesRelationToUser1667793899421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "role_id",
            type: "uuid",
            isNullable: true
        }))
        await queryRunner.createForeignKey("users", new TableForeignKey({
            name: "fk_users_roles",
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
