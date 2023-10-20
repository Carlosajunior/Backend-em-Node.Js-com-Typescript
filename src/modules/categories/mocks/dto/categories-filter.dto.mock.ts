import { datatype } from "faker";
import { CategoriesFilterDTO } from "../../dtos/categories-filter.dto";

export const mockCategoriesFilterDTO = (): CategoriesFilterDTO => ({
    filters: {
        "key": datatype.string() || datatype.boolean()
    }
})