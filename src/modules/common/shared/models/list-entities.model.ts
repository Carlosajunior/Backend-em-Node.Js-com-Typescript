export type ListEntitiesModel<EntityType> = {
  results: EntityType[]
  page: number
  last_page?: number
  total_pages: number
  total_results_per_page: number
  total_results: number
}
