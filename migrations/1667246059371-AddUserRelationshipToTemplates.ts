import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserRelationshipToTemplates1667246059371
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'template',
      new TableColumn({
        name: 'creator_id',
        isNullable: true,
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKeys('template', [
      new TableForeignKey({
        name: 'fk_template_user',
        columnNames: ['creator_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('template', 'creator_id');
  }
}
