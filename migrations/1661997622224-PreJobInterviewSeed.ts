import { MigrationInterface, QueryRunner } from "typeorm";

export class PreJobInterviewSeed1661997622224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO pre_job_interview (name) VALUES('Perfis aderentes')")
        await queryRunner.query("INSERT INTO pre_job_interview (name) VALUES('Currículo em formatação')")
        await queryRunner.query("INSERT INTO pre_job_interview (name) VALUES('Perfis prontos para o comercial')")
        await queryRunner.query("INSERT INTO pre_job_interview (name) VALUES('Enviados para o cliente')")
        await queryRunner.query("INSERT INTO pre_job_interview (name) VALUES('Entrevista agendada')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM pre_job_interview`);
    }

}
