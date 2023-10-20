import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class PostJobIndexColumn1667848355672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'post_job_interview',
      new TableColumn({
        name: 'index',
        default: 0,
        type: 'integer'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('post_job_interview', 'index');
  }
}
