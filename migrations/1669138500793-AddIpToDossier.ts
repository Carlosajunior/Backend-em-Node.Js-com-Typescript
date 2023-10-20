import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIpToDossier1669138500793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('dossiers', [
      new TableColumn({
        name: 'answered_at',
        type: 'timestamp',
        isNullable: true
      }),
      new TableColumn({
        name: 'profile_ip',
        type: 'varchar',
        isNullable: true
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('dossiers', ['answered_at', 'profile_ip']);
  }
}
