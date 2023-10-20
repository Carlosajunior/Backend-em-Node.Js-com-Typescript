import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsUserAudit1666376842332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'update audit a set creator_id = (SELECT u.id FROM users u WHERE a.user_email = u.email) where creator_id is null'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
