import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeProfessionalTitleToNullable1668727592609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE profile ALTER COLUMN professional_title DROP NOT NULL")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
