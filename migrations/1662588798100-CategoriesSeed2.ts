import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesSeed21662588798100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO categories (category) VALUES('Compliance')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Financeiro')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Inovação')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Jurídico')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Recursos Humanos')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM categories`);
    }

}
