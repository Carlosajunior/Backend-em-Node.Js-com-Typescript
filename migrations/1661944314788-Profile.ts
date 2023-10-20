import { BooleanStatus, ProfileAcceptContract, ProfileGender, ProfileStatus } from "@/modules/professional-profiles/profiles/contansts";
import { ProfileOrigin } from "@/modules/professional-profiles/profiles/contansts/profile-origin.constant";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Profile1661944314788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "profile",
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
                        name: "identify_id",
                        type: "integer",
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: true,
                        isUnique: true
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "birthdate",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "mother_name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "gender",
                        type: "enum",
                        enum: [ProfileGender.Female, ProfileGender.Male, ProfileGender.NoBinary, ProfileGender.NotAnswered],
                        isNullable: true
                    },
                    {
                        name: "cep",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "accept_contract",
                        type: "enum",
                        enum: [ProfileAcceptContract.Clt, ProfileAcceptContract.CltAndPj, ProfileAcceptContract.Pj],
                        isNullable: true
                    },
                    {
                        name: "clt_claim",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "pj_claim",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "professional_title",
                        type: "varchar"
                    },
                    {
                        name: "professional_about",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "quati_result",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "disc2_result",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "homeoffice",
                        type: "enum",
                        enum: [BooleanStatus.False, BooleanStatus.True],
                        isNullable: true
                    },
                    {
                        name: "uds",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "impedido",
                        type: "enum",
                        enum: [BooleanStatus.False, BooleanStatus.True],
                        isNullable: true
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
                        name: "alocated_by",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: [ProfileStatus.Alocado, ProfileStatus.Contratado],
                        isNullable: true
                    },
                    {
                        name: "extraction_ref",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "identify",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "origin",
                        type: "enum",
                        enum: [ProfileOrigin.CadastroInterno, ProfileOrigin.Importacao, ProfileOrigin.PortalDeVagas],
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
        await queryRunner.dropTable("profile")
    }

}
