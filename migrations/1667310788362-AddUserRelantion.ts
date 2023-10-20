import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserRelantion1667310788362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'profile',
      'username_id',
      new TableColumn({
        name: 'username_id',
        isNullable: true,
        type: 'uuid',
        
      })
    );

    await queryRunner.createForeignKeys('profile', [
      new TableForeignKey({
        name: 'fk_profile_creator_username',
        columnNames: ['username_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
