import { DefaultModel } from "@/modules/common/shared/models";
import { Dossier } from "@/modules/dossiers/entities/dossier.entity";
import { Columns } from "@/modules/funnel/columns/entities";
import { User } from "@/modules/users/entities/user.entity";

export type ObservationsModel = DefaultModel & {
    note: string;
    contact_date?: Date;
    identify?: string;
    status?: string;
    vacancy_id?: string;
    profile_id: string;
    linked_by: string;
    column_id: string;
    recruiter_id?: string
    column: Columns
    recruiter: User
    dossier?: Dossier
}