import { Languages } from "@/modules/common/languages/entities";
import { DefaultModel } from "@/modules/common/shared/models";
import { LanguageLevel } from "../constants/language-level.constant";
import { Vacancy } from "../entities/vacancy.entity";

export type VacancyLanguageModel = DefaultModel & {
    level: LanguageLevel.FLUENT,
    language_id: string
    vacancy_id: number
    language: Languages
    vacancy: Vacancy
}