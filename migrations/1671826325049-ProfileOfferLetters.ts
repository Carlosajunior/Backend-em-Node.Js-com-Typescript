import { OfferLetterStatusEnum } from "@/modules/professional-profiles/profiles-offer-letters/constants/offer-letter-status.constant";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfileOfferLetters1671826325049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'profile_offer_letters',
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
                        name: 'offer_letter_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'profile_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: [OfferLetterStatusEnum.Aceita, OfferLetterStatusEnum.Enviada, OfferLetterStatusEnum.Recusada],
                        enumName: 'offer_letter_status_enum',
                        isNullable: false
                    },
                    {
                        name: 'sent_by',
                        type: 'varchar',
                        isNullable: false
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
                        name: 'fk_profile_offer_letters_offer_letters',
                        columnNames: ['offer_letter_id'],
                        referencedTableName: 'offer_letters',
                        referencedColumnNames: ['id']
                    },
                    {
                        name: 'fk_profile_offer_letters_profile',
                        columnNames: ['profile_id'],
                        referencedTableName: 'profile',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profile_offer_letters');
    }


}
