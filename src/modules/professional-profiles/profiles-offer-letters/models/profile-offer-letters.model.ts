import { DefaultModel } from "@/modules/common/shared/models";
import { OfferLetter } from "@/modules/offer-letters/entities/offer-letter.entity";
import { Profile } from "../../profiles/entities";
import { OfferLetterStatusEnum } from "../constants/offer-letter-status.constant";

export type ProfileOfferLettersModel = DefaultModel & {
    offer_letter_id: string
    offer_letters: OfferLetter
    profile_id: string
    profile: Profile
    status: OfferLetterStatusEnum
    sent_by: string
    offer_letter_content: string
    vacancy_id: number
};