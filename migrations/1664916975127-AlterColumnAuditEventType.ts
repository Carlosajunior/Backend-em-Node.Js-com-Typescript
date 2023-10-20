import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnAuditEventType1664916975127
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audit" ALTER COLUMN event_type TYPE varchar(100);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
