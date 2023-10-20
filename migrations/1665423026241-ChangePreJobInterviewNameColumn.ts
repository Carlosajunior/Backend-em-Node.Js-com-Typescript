import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangePreJobInterviewNameColumn1665423026241
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "UPDATE pre_job_interview  SET name = 'Currículo' WHERE name = 'Currículo em formatação'"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "UPDATE pre_job_interview  SET name = 'Currículo em formatação' WHERE name = 'Currículo'"
    );
  }
}
