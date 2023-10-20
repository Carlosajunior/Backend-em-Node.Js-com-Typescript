import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Office1661970635248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "office",
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
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "duration",
                        type: "varchar"
                    },
                    {
                        name: "location",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "initial_date",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "end_date",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "current_position",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "experience_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_office_experience",
                        columnNames: ["experience_id"],
                        referencedTableName: "experience",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("office")
    }


}
