import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Experience1661970404430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "experience",
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
                        name: "company",
                        type: "varchar"
                    },
                    {
                        name: "position",
                        type: "varchar"
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
                        name: "profile_id",
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
                        name: "fk_experience_profile",
                        columnNames: ["profile_id"],
                        referencedTableName: "profile",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("experience")
    }

}
