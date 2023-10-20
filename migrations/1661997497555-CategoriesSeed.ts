import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesSeed1661997497555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO categories (category) VALUES('Analise')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Comercial')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Desenvolvimento')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Design UI/UX')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('DevOps')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Gestão')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Infraestrutura')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Marketing')")
        await queryRunner.query("INSERT INTO categories (category) VALUES('Qualidade')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM categories`);
    }

}
