import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class SeedColumnInscritosOnColumns1669378320317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO pre_job_interview (name) VALUES('Inscritos')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
