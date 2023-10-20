import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropUnusedColumnsVacancies1665773149829
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('vacancies', [
      'created_by',
      'username_id',
      'recruiter'
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('vacancies', [
      'created_by',
      'username_id',
      'recruiter'
    ]);
  }
}
