import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsUserTemplate1667247079971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "update template set created_by = replace(created_by, 'Usuario', 'Usuário') where created_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update template t set username_id = (SELECT u.id FROM users u WHERE t.created_by = concat(u.name,' ', u.middle_name) ) where creator_id is null"
    );

    await queryRunner.query(
      "update template t set creator_id = (SELECT u.id FROM users u WHERE t.created_by = concat(u.name,' ', u.middle_name) ) where creator_id is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
