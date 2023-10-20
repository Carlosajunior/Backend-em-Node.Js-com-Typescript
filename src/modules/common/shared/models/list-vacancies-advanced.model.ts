export type SearchVacancyAdvancedModel<EntityType> = {
  results: EntityType[]
  page: number
  total_pages: number
  total_results_per_page: number
  total_results: number
}
