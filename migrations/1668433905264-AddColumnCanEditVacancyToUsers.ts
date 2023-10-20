import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCanEditVacancyToUsers1668433905264
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'can_edit_vacancy',
        type: 'boolean',
        default: false,
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'can_edit_vacancy');
  }
}
