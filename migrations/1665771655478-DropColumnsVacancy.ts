import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropColumnsVacancy1665771655478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table if exists vacancies_contacts');
    await queryRunner.query('drop table if exists vacancies_customers');
    await queryRunner.query('drop table if exists vacancies_funnels');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table if exists vacancies_contacts');
    await queryRunner.query('drop table if exists vacancies_customers');
    await queryRunner.query('drop table if exists vacancies_funnels');
  }
}
