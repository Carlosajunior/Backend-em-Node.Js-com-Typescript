import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsUserNameProfile1667311088318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "update profile set created_by = replace(created_by, 'Usuario', 'Usuário') where created_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update profile t set username_id = (SELECT u.id FROM users u WHERE t.created_by = concat(u.name,' ', u.middle_name) ) where username_id is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
