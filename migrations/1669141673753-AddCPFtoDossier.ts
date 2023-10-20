import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCPFtoDossier1669141673753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'dossiers',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
