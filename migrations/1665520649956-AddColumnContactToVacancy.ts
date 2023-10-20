import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddColumnContactToVacancy1665520649956
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vacancies',
      new TableColumn({
        name: 'contact_id',
        type: 'uuid',
        isNullable: true
      })
    );

    await queryRunner.createForeignKeys('vacancies', [
      new TableForeignKey({
        name: 'fk_vacancy_contact',
        columnNames: ['contact_id'],
        referencedTableName: 'contact',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
