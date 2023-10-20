import { datatype, random } from "faker";
import { TagCategories } from "../../constants/tag-categories.constants";
import { UpdateTagDTO } from "../../dtos/update-tag.dto";

export const mockUpdateTagDTO = (): UpdateTagDTO => ({
    name: datatype.string(),
    category: random.arrayElement(Object.values(TagCategories))
})