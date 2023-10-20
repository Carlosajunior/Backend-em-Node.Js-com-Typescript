import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ListSimpleModel } from '@/modules/common/shared/models'
import { Columns } from '../entities'
import { ListColumnsService } from '../services'
import { ListColumnsDTO } from '../dtos'
import { ApiTags } from '@nestjs/swagger'

@Controller('columns')
@ApiTags("columns")
export class ListColumnsController {
  constructor(private readonly listColumnsService: ListColumnsService) { }

  @Get()
  async handle(@Query() { records_limit, id }: ListColumnsDTO): Promise<ListSimpleModel<Columns>> {
    try {
      return this.listColumnsService.list({
        id,
        records_limit
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
