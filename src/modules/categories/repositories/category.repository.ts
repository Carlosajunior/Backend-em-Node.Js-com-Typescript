import { ListEntitiesModel } from "@/modules/common/shared/models";
import { SearchDTO } from "@/modules/messages/dtos";
import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { CategoriesParamsModel } from "../constants";
import { CategoriesFilterDTO } from "../dtos/categories-filter.dto";
import { Categories } from "../entities";

@EntityRepository(Categories)
export class CategoriesRepository extends Repository<Categories>{

  async countCategories (condition?: string): Promise<number> {
    return condition
      ? createQueryBuilder<Categories>('categories')
        .where(condition)
        .getCount()
      : createQueryBuilder<Categories>('categories')
        .getCount()
  }

  getArrayKeys(object, value: string | number | boolean) {
    return Object.keys(object || {}).filter(key => object[key] === value);
  }

  getKey(object, value: string | number | boolean) {
    return Object.keys(object || {}).find(key => object[key] === value);
  }

  async findCategories (query: SearchDTO & CategoriesFilterDTO | undefined): Promise<ListEntitiesModel<Categories>> {
    const { page, records_per_page: recordsPerPage, search, ...filters } = query
    const categories_filters = this.getArrayKeys(filters, 'true').map(field => this.getKey(CategoriesParamsModel, field))
    const condition = `category ilike '%${search}%'`
    const categories = await createQueryBuilder<Categories>('categories')
      .where(condition)
      if (!!categories_filters.length) {
        categories.andWhere('category IN(:...cat)', { cat: categories_filters})
      }
      const results = await categories.take(recordsPerPage)
      .skip((page - 1) * recordsPerPage)
      .orderBy('category')
      .getMany()


    const categoriesCount = await this.countCategories(condition)
    return {
      page,
      results,
      total_results_per_page: results.length,
      total_results: categoriesCount,
      total_pages: Math.ceil(categoriesCount / recordsPerPage)
    }
  }
}