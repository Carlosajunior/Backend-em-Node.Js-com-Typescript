import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsUsersCustomer1667217597823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "update customer c set created_by = replace(created_by, 'Usuario', 'Usuário') where created_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update customer c set creator_id = (SELECT u.id FROM users u WHERE c.created_by = concat(u.name,' ', u.middle_name) ) where creator_id is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
