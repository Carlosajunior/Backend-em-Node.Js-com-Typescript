import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class ChangeDossierObservationCascade1669780416503
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'dossiers',
      'observation_id',
      new TableColumn(
        {
          name: 'observation_id',
          type: 'uuid',
          isNullable: true
        }
      )
    );
    
    await queryRunner.dropForeignKey('dossiers', 'fk_dossier_observation');
    
    await queryRunner.createForeignKey(
        'dossiers',
        new TableForeignKey({
            name: 'fk_dossier_observation',
            columnNames: ['observation_id'],
            referencedTableName: 'observation',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
