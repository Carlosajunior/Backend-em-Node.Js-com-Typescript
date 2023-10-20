import { MigrationInterface, QueryRunner } from "typeorm";

export class MakePostPreJobInterviewColumnsUnique1670625497836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE pre_job_interview ADD CONSTRAINT pre_job_interview_name_unique UNIQUE(name)")
        await queryRunner.query("ALTER TABLE post_job_interview ADD CONSTRAINT post_job_interview_name_unique UNIQUE(name)")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
