import { DefaultModel } from "@/modules/common/shared/models";

export type RolesModel = DefaultModel & {
    name: string
    status: boolean
    description: string
}