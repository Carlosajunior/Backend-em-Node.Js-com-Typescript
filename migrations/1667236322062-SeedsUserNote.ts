import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsUserNote1667236322062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "update note n set user_id = (SELECT u.id FROM users u WHERE n.user = concat(u.name,' ', u.middle_name) ) where user_id is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
