import { TemplateStatus } from '@/modules/templates/constants/template-status.constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class TemplateStatus1667852838163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'template',
      new TableColumn({
        name: 'status',
        isNullable: true,
        type: 'enum',
        enum: [
          TemplateStatus.ACTIVE,
          TemplateStatus.DELETED,
          TemplateStatus.INACTIVE
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('template', 'status');
  }
}
