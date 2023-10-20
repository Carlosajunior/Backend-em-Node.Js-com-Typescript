import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class ChangeVacancyRelationships1665768307073
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('vacancies', [
      new TableColumn({
        name: 'commercial_id',
        isNullable: true,
        type: 'uuid'
      }),
      new TableColumn({
        name: 'customer_id',
        isNullable: true,
        type: 'uuid'
      }),
      new TableColumn({
        name: 'funnel_id',
        isNullable: true,
        type: 'uuid'
      }),
      new TableColumn({
        name: 'recruiter_id',
        isNullable: true,
        type: 'uuid'
      })
    ]);

    await queryRunner.createForeignKeys('vacancies', [
      new TableForeignKey({
        name: 'fk_vacancy_commercial',
        columnNames: ['commercial_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      }),
      new TableForeignKey({
        name: 'fk_vacancy_customer',
        columnNames: ['customer_id'],
        referencedTableName: 'customer',
        referencedColumnNames: ['id']
      }),
      new TableForeignKey({
        name: 'fk_vacancy_funnel',
        columnNames: ['funnel_id'],
        referencedTableName: 'funnel',
        referencedColumnNames: ['id']
      }),
      new TableForeignKey({
        name: 'fk_vacancy_recruiter',
        columnNames: ['recruiter_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);

    await queryRunner.dropColumns('vacancies', ['client', 'service_type']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('vacancies', [
      'commercial_id',
      'customer_id',
      'funnel_id',
      'recruiter_id'
    ]);
  }
}
