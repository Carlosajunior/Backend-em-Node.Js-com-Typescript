import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnSMSTitleToMessage1664396473775
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" ADD COLUMN sms_title varchar(100)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" DROP COLUMN sms_title varchar(100)`
    );
  }
}
