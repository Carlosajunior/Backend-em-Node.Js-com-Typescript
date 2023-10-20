import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

enum CVStatus {
  GENERATED = 'GENERATED',
  ERROR = 'ERROR'
}

export class AddStatusToCV1667479633987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'generated_cvs',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: [CVStatus.GENERATED, CVStatus.ERROR]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('generated_cvs', 'status');
  }
}
