import { DefaultEntity } from "@/modules/common/shared/entities";
import { OfferLetter } from "@/modules/offer-letters/entities/offer-letter.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Profile } from "../../profiles/entities";
import { OfferLetterStatusEnum } from "../constants/offer-letter-status.constant";
import { ProfileOfferLettersModel } from "../models/profile-offer-letters.model";

@Entity()
export class ProfileOfferLetters extends DefaultEntity implements ProfileOfferLettersModel {
    @Column()
    vacancy_id: number;

    @Column()
    offer_letter_content: string;

    @Column()
    offer_letter_id: string;

    @ManyToOne(() => OfferLetter, (offerLetter) => offerLetter.id)
    @JoinColumn({ name: 'offer_letter_id' })
    offer_letters: OfferLetter;

    @Column()
    profile_id: string;

    @ManyToOne(() => Profile, (profile) => profile.id)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @Column({ enum: OfferLetterStatusEnum })
    status: OfferLetterStatusEnum;

    @Column()
    sent_by: string;

}