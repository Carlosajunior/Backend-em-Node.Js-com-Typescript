import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserUpdaterRelantionshipToProfessionalProfiles1667241402869
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'profile',
      new TableColumn({
        name: 'updater_id',
        isNullable: true,
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKeys('profile', [
      new TableForeignKey({
        name: 'fk_profile_updater',
        columnNames: ['updater_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('profile', 'updater_id');
  }
}
