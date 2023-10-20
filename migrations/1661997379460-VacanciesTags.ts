import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VacanciesTags1661997379460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vacancies_tags",
                columns: [
                    {
                        name: 'vacancy_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'tag_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vacancies_tags")
    }

}
