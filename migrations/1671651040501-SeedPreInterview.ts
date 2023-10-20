import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPreInterview1671651040501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO pre_job_interview (name) VALUES('Aguardando entrevista')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
