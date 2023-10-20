import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListEntitiesModel } from '../../common/shared/models';
import { SearchDTO } from '../../messages/dtos';
import { CategoriesService } from '../services/categories.service';
import { CategoriesFilterDTO } from '../dtos/categories-filter.dto';
import { Categories } from '../entities';

@Controller('categories')
@ApiTags("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  async handle(@Query() {
    page,
    records_per_page: recordsPerPage,
    search,
    ...filters
  }: SearchDTO & CategoriesFilterDTO): Promise<ListEntitiesModel<Categories>> {
    try {
      return this.categoriesService.list({
        page: page && Math.floor(page),
        records_per_page: recordsPerPage && Math.floor(recordsPerPage),
        search,
        ...filters
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
