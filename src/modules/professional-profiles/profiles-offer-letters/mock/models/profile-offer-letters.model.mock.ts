import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockOfferLetterModel } from "@/modules/offer-letters/mocks/models/offer-letter.model.mock";
import { mockProfileModel } from "@/modules/professional-profiles/profiles/mocks/models/profile.model.mock";
import { datatype } from "faker";
import { OfferLetterStatusEnum } from "../../constants/offer-letter-status.constant";
import { ProfileOfferLettersModel } from "../../models/profile-offer-letters.model";

export const mockProfileOffertLettersModel = (): ProfileOfferLettersModel => ({
    ...mockDefaultModel(),
    offer_letter_id: datatype.string(),
    offer_letters: mockOfferLetterModel(),
    profile_id: datatype.string(),
    profile: mockProfileModel(),
    status: OfferLetterStatusEnum.Enviada,
    sent_by: datatype.string(),
    offer_letter_content: datatype.string(),
    vacancy_id: datatype.number()
})