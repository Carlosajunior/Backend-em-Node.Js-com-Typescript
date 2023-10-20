import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInDossier1669122551855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'dossiers',
      new TableColumn({
        name: 'starts_at',
        type: 'timestamp',
        default: 'now()'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('dossier', 'starts_at');
  }
}
