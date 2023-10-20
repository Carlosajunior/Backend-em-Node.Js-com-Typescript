import { datatype } from "faker";
import { SearchLanguageDTO } from "../../dtos/search-language.dto";

export const mockSearchLanguageDTO = (): SearchLanguageDTO => ({
    search: datatype.string(),
    records_limit: datatype.number()
})