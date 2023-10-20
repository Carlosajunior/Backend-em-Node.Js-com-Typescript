import { DefaultModel } from "@/modules/common/shared/models";
import { Observation } from "@/modules/professional-profiles/observations/entities";
import { User } from "@/modules/users/entities/user.entity";
import { DossierStatus } from "../constants/dossier-status.constant";
import { ProfileDataStatus } from "../constants/profile-data-status.constant";

export type DossierModel = DefaultModel & {
    answered_at: Date;
    cpf: string,
    data_are_divergent: boolean,
    data_are_true: boolean,
    dossier_status: DossierStatus,
    profile_data_status: ProfileDataStatus,
    profile_ip: string,
    note: string,
    starts_at: Date,
    observation_id: string,
    user_id: string,
    observation: Observation,
    user: User
}