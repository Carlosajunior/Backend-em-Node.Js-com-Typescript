import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropColumnTemplate1668788382398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE template DROP COLUMN category_id');
    await queryRunner.query('DROP TABLE template_categories');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
