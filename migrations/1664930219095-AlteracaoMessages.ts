import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlteracaoMessages1664930219095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('message', new TableColumn({
            name: "vacancy_id",
            type: "integer",
            isNullable: true
        }))
        await queryRunner.createForeignKeys('message', [
            new TableForeignKey({
                name: "fk_message_vacancies",
                columnNames: ["vacancy_id"],
                referencedTableName: "vacancies",
                referencedColumnNames: ["id"],

            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
