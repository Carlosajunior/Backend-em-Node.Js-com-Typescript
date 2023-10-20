export type ListVacancySearchModel<EntityType> = {
  results: EntityType[]
  search_limit: number
  total_results: number
}
