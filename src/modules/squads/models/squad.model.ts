import { DefaultModel } from "@/modules/common/shared/models";

export type SquadModel = DefaultModel & {
    name: string;
    is_active: boolean;
}