import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class VacanciesLanguages1665751240961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('vacancies_languages', [
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isGenerated: true,
        isPrimary: true,
        generationStrategy: 'uuid',
        isUnique: true
      }),
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }),
      new TableColumn({
        name: 'level',
        type: 'varchar',
        isNullable: true
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('vacancies_languages', [
      'id',
      'created_at',
      'level',
      'updated_at'
    ]);
  }
}
