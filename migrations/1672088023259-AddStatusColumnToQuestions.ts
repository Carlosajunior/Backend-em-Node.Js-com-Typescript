import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddStatusColumnToQuestions1672088023259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('questions', new TableColumn({
            name: "status",
            type: "boolean",
            isNullable: false,
            default: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
