import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Answers1669831213606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'answers',
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
                        name: 'question_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'alternative_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'profile_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'answer',
                        type: 'varchar',
                        isNullable: true
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
                        name: 'fk_answers_questions',
                        columnNames: ['question_id'],
                        referencedTableName: 'questions',
                        referencedColumnNames: ['id']
                    },
                    {
                        name: 'fk_answers_alternative',
                        columnNames: ['alternative_id'],
                        referencedTableName: 'alternatives',
                        referencedColumnNames: ['id']
                    },
                    {
                        name: 'fk_answers_profile',
                        columnNames: ['profile_id'],
                        referencedTableName: 'profile',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('answers');
    }

}
