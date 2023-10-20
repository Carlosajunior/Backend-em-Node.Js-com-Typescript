import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserToObservation1668694439260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    await queryRunner.addColumn(
      'observation',
      new TableColumn({
        name: 'recruiter_id',
        isNullable: true,
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKeys('observation', [
      new TableForeignKey({
        name: 'fk_observation_recruiter',
        columnNames: ['recruiter_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    ]);

    await queryRunner.query(
      "update observation set linked_by = replace(linked_by, 'Usuario', 'Usuário') where linked_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update observation o set recruiter_id = (SELECT u.id FROM users u WHERE o.linked_by = concat(u.name,' ', u.middle_name) ) where recruiter_id is null"
    );

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
