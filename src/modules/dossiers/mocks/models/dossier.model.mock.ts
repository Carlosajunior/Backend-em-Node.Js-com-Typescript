import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockObservationModel } from "@/modules/professional-profiles/observations/mocks/models/observations.model.mock";
import { User } from "@/modules/users/entities/user.entity";
import { datatype } from "faker";
import { DossierStatus } from "../../constants/dossier-status.constant";
import { ProfileDataStatus } from "../../constants/profile-data-status.constant";
import { DossierModel } from "../../models/dossier.model";

export const mockDossierModel = (): DossierModel => ({
    ...mockDefaultModel(),
    answered_at: new Date(),
    cpf: datatype.string(),
    data_are_divergent: datatype.boolean(),
    data_are_true: datatype.boolean(),
    dossier_status: DossierStatus.AWAITING_DOSSIER_GENERATION,
    profile_data_status: ProfileDataStatus.APPROVED,
    profile_ip: datatype.string(),
    note: datatype.string(),
    starts_at: new Date(),
    observation_id: datatype.string(),
    user_id: datatype.string(),
    observation: mockObservationModel(),
    user: new User()
})