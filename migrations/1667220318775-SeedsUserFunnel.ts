import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsUserFunnel1667220318775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "update funnel set created_by = replace(created_by, 'Usuario', 'Usuário') where created_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update funnel f set creator_id = (SELECT u.id FROM users u WHERE f.created_by = concat(u.name,' ', u.middle_name) ) where creator_id is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
