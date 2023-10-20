import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropTableVacanciesCustomers1665772717150
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table if exists vacancies_customers');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table if exists vacancies_customers');
  }
}
