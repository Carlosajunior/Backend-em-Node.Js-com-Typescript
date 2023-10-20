import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUpdateByColumnToQuestions1669984966545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('questions', new TableColumn({
            name: "updated_by",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
