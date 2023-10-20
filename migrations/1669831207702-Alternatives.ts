import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Alternatives1669831207702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'alternatives',
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
                        name: 'description',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'question_id',
                        type: 'uuid',
                        isNullable: false
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
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_alternatives_questions',
                        columnNames: ['question_id'],
                        referencedTableName: 'questions',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('alternatives');
    }
}
