export type SearchVacancyBasicModel<EntityType> = {
  results: EntityType[]
  page: number
  total_pages: number
  total_results_per_page: number
  total_results: number
}
