import { FunnelConstants } from "@/modules/funnel/constants";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Funnel1661956589618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "funnel",
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
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: [FunnelConstants.Active, FunnelConstants.All, FunnelConstants.Inactive],
                        isNullable: true,
                        default: `'Ativo'`
                    },
                    {
                        name: "created_by",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "username_id",
                        type: "varchar",
                        isNullable: true
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
        await queryRunner.dropTable("funnel")
    }

}
