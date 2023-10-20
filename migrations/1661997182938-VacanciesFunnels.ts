import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VacanciesFunnels1661997182938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vacancies_funnels",
                columns: [
                    {
                        name: 'vacancy_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'funnel_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vacancies_funnels")
    }

}
