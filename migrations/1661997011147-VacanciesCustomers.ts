import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VacanciesCustomers1661997011147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vacancies_customers",
                columns: [
                    {
                        name: 'vacancy_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'customer_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vacancies_customers")
    }


}
