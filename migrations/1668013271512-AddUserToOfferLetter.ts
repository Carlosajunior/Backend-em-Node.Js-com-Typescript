import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserToOfferLetter1668013271512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'offer_letters',
      new TableColumn({ name: 'user_id', type: 'uuid' })
    );

    await queryRunner.createForeignKeys('offer_letters', [
      new TableForeignKey({
        name: 'fk_offer_letters_user',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('offer_letters', 'user_id');
  }
}
