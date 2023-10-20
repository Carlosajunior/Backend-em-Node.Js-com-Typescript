import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Formation1661970808161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "formation",
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
                        name: "institution",
                        type: "varchar"
                    },
                    {
                        name: "course",
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
                        name: "fk_formation_profile",
                        columnNames: ["profile_id"],
                        referencedTableName: "profile",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("formation")
    }

}
