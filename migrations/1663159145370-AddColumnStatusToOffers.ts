import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnStatusToOffers1663159145370
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offers" ADD COLUMN "status" varchar(100)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offers" DROP COLUMN "status" varchar(100)`
    );
  }
}
