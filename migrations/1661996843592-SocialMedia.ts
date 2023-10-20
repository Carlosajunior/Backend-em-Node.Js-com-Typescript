import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SocialMedia1661996843592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "social_media",
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
                        name: "type",
                        type: "varchar"
                    },
                    {
                        name: "link",
                        type: "varchar"
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
                        name: "fk_social_media_profile",
                        columnNames: ["profile_id"],
                        referencedTableName: "profile",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("social_media")
    }
}
