import { LanguageLevel } from "@/modules/professional-profiles/languages/constants";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Languages1661913780382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "languages",
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
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("languages")
    }


}
