import { DossierStatus } from '@/modules/dossiers/constants/dossier-status.constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeDossierStatus1669051401883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'dossiers',
      'dossier_status',
      new TableColumn({
        name: 'dossier_status',
        type: 'enum',
        enum: [
          DossierStatus.AWAITING_DOSSIER_GENERATION,
          DossierStatus.EMAIL_ERROR,
          DossierStatus.EMAIL_SENT,
          DossierStatus.EXPIRED_EMAIL,
          DossierStatus.GENERATED_DOSSIER
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
