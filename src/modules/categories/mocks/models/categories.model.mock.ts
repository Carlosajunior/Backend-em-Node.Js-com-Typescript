import { CategoriesModel } from "@/modules/categories/models/categories.model";
import { datatype } from "faker";

export const mockCategoriesModel = (): CategoriesModel => ({
    id: datatype.number(),
    category: datatype.string(),
    created_at: new Date(),
    updated_at: new Date()
})