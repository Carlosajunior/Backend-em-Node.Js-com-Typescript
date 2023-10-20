import { LanguageLevel } from "@/modules/professional-profiles/languages/constants";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Language1661970958107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "language",
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
                        name: "language",
                        type: "varchar"
                    },
                    {
                        name: "level",
                        type: "enum",
                        enum: [LanguageLevel.Advanced, LanguageLevel.Beginner, LanguageLevel.Fluent, LanguageLevel.Intermediary]
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
                        name: "fk_language_profile",
                        columnNames: ["profile_id"],
                        referencedTableName: "profile",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("language")
    }

}
