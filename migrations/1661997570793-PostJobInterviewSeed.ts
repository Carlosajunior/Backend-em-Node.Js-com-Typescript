import { MigrationInterface, QueryRunner } from "typeorm";

export class PostJobInterviewSeed1661997570793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO post_job_interview (name) VALUES('Entrevistados aguardando feedback')")
        await queryRunner.query("INSERT INTO post_job_interview (name) VALUES('Reprovado')")
        await queryRunner.query("INSERT INTO post_job_interview (name) VALUES('Desistente')")
        await queryRunner.query("INSERT INTO post_job_interview (name) VALUES('Aprovado')")
        await queryRunner.query("INSERT INTO post_job_interview (name) VALUES('Carta oferta enviada')")
        await queryRunner.query("INSERT INTO post_job_interview (name) VALUES('Contratado')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM post_job_interview`);
    }

}
