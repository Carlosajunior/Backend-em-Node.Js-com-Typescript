import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddApproveTagField1664424296285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tag',
      new TableColumn({
        name: 'to_approve',
        type: 'boolean',
        default: false
      })
    );

    await queryRunner.addColumn(
      'tag',
      new TableColumn({
        name: 'approved_by',
        type: 'varchar',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tag', 'to_approve');
    await queryRunner.dropColumn('tag', 'approved_by');
  }
}
