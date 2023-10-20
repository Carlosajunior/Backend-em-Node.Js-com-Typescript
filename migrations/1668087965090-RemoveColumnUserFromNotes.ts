import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveColumnUserFromNotes1668087965090
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('note', 'user');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
