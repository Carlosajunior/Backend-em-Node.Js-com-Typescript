import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsUpdaterProfile1667241480579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "update profile set updated_by = replace(updated_by, 'Usuario', 'Usuário') where updated_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update profile p set updater_id = (SELECT u.id FROM users u WHERE p.updated_by = concat(u.name,' ', u.middle_name) ) where updater_id is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
