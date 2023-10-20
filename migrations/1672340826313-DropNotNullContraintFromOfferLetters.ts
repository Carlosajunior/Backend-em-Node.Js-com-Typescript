import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNotNullContraintFromOfferLetters1672340826313
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    await queryRunner.query(
      'ALTER TABLE offer_letters ALTER COLUMN t_shirt_size DROP NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE offer_letters ALTER COLUMN send_equipment SET DEFAULT false'
    );
    await queryRunner.query(
      'ALTER TABLE offer_letters ALTER COLUMN has_provisional_equipment_to_start SET DEFAULT false'
    );

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
