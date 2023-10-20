import { datatype } from "faker";
import { LanguageLevel } from "../../constants/language-level.constant";
import { LanguageDTO } from "../../dtos/language.dto";

export const mockLanguageDTO = (): LanguageDTO => ({
    id: datatype.string(),
    level: LanguageLevel.FLUENT
})