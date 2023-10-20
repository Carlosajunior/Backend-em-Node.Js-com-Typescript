import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserRelantionshipToAudit1666376435619
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'audit',
      new TableColumn({
        name: 'creator_id',
        isNullable: true,
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKeys('audit', [
      new TableForeignKey({
        name: 'fk_audit_creator',
        columnNames: ['creator_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('audit', 'creator_id');
  }
}
