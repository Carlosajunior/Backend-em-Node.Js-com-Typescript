import { mockLanguageModel } from "@/modules/common/languages/mocks";
import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { datatype } from "faker";
import { LanguageLevel } from "../../constants/language-level.constant";
import { VacancyLanguageModel } from "../../models/vacancy_languages.model";
import { mockVacancyModel } from "./vacancy.model.mock";

export const mockVacancyLanguageModel = (): VacancyLanguageModel => ({
    ...mockDefaultModel(),
    level: LanguageLevel.FLUENT,
    language_id: datatype.string(),
    vacancy_id: datatype.number(),
    language: mockLanguageModel(),
    vacancy: mockVacancyModel()
})