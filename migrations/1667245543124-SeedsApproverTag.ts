import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsApproverTag1667245543124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "update tag set approved_by = replace(approved_by, 'Usuario', 'Usuário') where approved_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update tag t set approver_id = (SELECT u.id FROM users u WHERE t.approved_by = concat(u.name,' ', u.middle_name) ) where approver_id is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
