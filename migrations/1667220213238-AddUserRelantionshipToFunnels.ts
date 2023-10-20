import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserRelantionshipToFunnels1667220213238
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'funnel',
      new TableColumn({
        name: 'creator_id',
        isNullable: true,
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKeys('funnel', [
      new TableForeignKey({
        name: 'fk_funnel_creator',
        columnNames: ['creator_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('funnel', 'creator_id');
  }
}
