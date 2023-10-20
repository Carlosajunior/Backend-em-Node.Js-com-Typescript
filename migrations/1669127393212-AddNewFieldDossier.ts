import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewFieldDossier1669127393212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('dossiers', [
      new TableColumn({
        name: 'data_are_divergent',
        type: 'boolean',
        isNullable: true
      }),
      new TableColumn({
        name: 'data_are_true',
        type: 'boolean',
        isNullable: true
      }),
      new TableColumn({
        name: 'note',
        type: 'text',
        isNullable: true
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('dossiers', [
      'data_are_divergent',
      'data_are_true',
      'note'
    ]);
  }
}
