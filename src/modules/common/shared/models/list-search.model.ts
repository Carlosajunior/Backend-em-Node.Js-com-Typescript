export type ListSearchModel<EntityType> = {
  results: EntityType[]
  search_limit: number
  total_results: number
}
