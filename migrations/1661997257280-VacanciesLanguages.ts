import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VacanciesLanguages1661997257280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vacancies_languages",
                columns: [
                    {
                        name: 'vacancy_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'language_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vacancies_languages")
    }

}
