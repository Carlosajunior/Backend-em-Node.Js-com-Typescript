import { Injectable, NotFoundException } from '@nestjs/common';
import { ListEntitiesModel } from '../../common/shared/models';
import { SearchDTO } from '../../messages/dtos';
import { CategoriesFilterDTO } from '../dtos/categories-filter.dto';
import { Categories } from '../entities';
import { CategoriesRepository } from '../repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) { }

  async list({
    page = 1,
    records_per_page: recordsPerPage = 20,
    search = '',
    ...filters
  }: SearchDTO & CategoriesFilterDTO): Promise<ListEntitiesModel<Categories>> {
    try {
      return await this.categoriesRepository.findCategories({
        page,
        records_per_page: recordsPerPage,
        search,
        ...filters
      })
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
