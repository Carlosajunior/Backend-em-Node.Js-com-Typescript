import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnOfferLetterContentAndVacancyIdToProfileOfferLetters1672253814998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('profile_offer_letters', new TableColumn({
            name: "offer_letter_content",
            type: "varchar",
            isNullable: false
        }))
        await queryRunner.addColumn('profile_offer_letters', new TableColumn({
            name: "vacancy_id",
            type: "integer",
            isNullable: false
        }))
        await queryRunner.createForeignKey('profile_offer_letters', new TableForeignKey({
            name: "fk_profile_offer_letters_vacancies",
            columnNames: ["vacancy_id"],
            referencedTableName: "vacancies",
            referencedColumnNames: ["id"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
