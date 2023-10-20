import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsTemplateStatus1667905049616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    await queryRunner.query(
      "UPDATE template t SET status = 'ACTIVE' where t.active = true"
    );

    await queryRunner.query(
      "UPDATE template t SET status = 'INACTIVE' where t.active = false"
    );

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
