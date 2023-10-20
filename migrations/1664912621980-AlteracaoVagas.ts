import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlteracaoVagas1664912621980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('vacancies', [
            new TableColumn({
                name: "recruiter",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn({
                name: "partner_company",
                type: "varchar",
                isNullable: true
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
