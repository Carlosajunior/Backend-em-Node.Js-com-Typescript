import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VacanciesContacts1664194231639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vacancies_contacts",
                columns: [
                    {
                        name: 'vacancy_id',
                        type: 'integer',
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: 'contact_id',
                        type: 'uuid',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_vacancies_contacts_vacancies",
                        columnNames: ["vacancy_id"],
                        referencedTableName: "vacancies",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_vacancies_contacts_contact",
                        columnNames: ["contact_id"],
                        referencedTableName: "contact",
                        referencedColumnNames: ["id"]
                    }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vacancies_contacts")
    }

}
