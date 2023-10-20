import { DossierStatus } from '@/modules/dossiers/constants/dossier-status.constant';
import { ProfileDataStatus } from '@/modules/dossiers/constants/profile-data-status.constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Dossier1669032878084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dossiers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()'
          },
          {
            name: 'dossier_status',
            type: 'enum',
            enum: [
              DossierStatus.AWAITING_DOSSIER_GENERATION,
              DossierStatus.EMAIL_SENT,
              DossierStatus.EXPIRED_EMAIL,
              DossierStatus.GENERATED_DOSSIER
            ]
          },
          {
            name: 'profile_data_status',
            isNullable: true,
            type: 'enum',
            enum: [ProfileDataStatus.APPROVED, ProfileDataStatus.DISAPPROVED]
          },
          {
            name: 'observation_id',
            type: 'uuid'
          },
          {
            name: 'user_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'fk_dossier_observation',
            columnNames: ['observation_id'],
            referencedTableName: 'observation',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_dossier_user',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dossiers');
  }
}
