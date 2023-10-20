import { State } from "@/modules/customers/entities/customer.entity";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Customer1661957005319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "customer",
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
                        name: "customerId",
                        type: "varchar",
                        length: "7",
                        isNullable: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "document",
                        type: "varchar",
                        length: "18",
                        isNullable: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "16",
                        isNullable: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "70",
                        isNullable: true,
                    },
                    {
                        name: "state",
                        type: "enum",
                        enum: [
                            State.AC,
                            State.AL,
                            State.AM,
                            State.AP,
                            State.BA,
                            State.CE,
                            State.DF,
                            State.ES,
                            State.GO,
                            State.MA,
                            State.MG,
                            State.MS,
                            State.MT,
                            State.PA,
                            State.PB,
                            State.PE,
                            State.PI,
                            State.PR,
                            State.RJ,
                            State.RN,
                            State.RR,
                            State.RS,
                            State.SC,
                            State.SE,
                            State.SP,
                            State.TO
                        ],
                        isNullable: true
                    },
                    {
                        name: "city",
                        type: "varchar",
                        length: "60",
                        isNullable: true,
                    },
                    {
                        name: "notes",
                        type: "varchar",
                        length: "500",
                        isNullable: true,
                    },
                    {
                        name: "logoId",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "created_by",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "username_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "clt_benefits",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "pj_benefits",
                        type: "varchar",
                        isNullable: true,
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
                        name: "fk_customer_logo",
                        columnNames: ["logoId"],
                        referencedTableName: "logo",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customer")
    }

}
