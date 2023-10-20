import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddStatusActiveToContacts1670244002239 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('contact', new TableColumn({
            name: "active",
            type: "boolean",
            isNullable: true,
            default: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
