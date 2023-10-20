import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnsCurriuclumName1665430889815
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "UPDATE columns  SET name = 'Currículo' WHERE name = 'Currículo em formatação'"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "UPDATE columns  SET name = 'Currículo em formatação' WHERE name = 'Currículo'"
    );
  }
}
