import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common'
import { CheckByCpf } from '@/modules/professional-profiles/profiles/services'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@Controller('professional-profiles')
@ApiTags("professional profiles")
export class CheckByCpfController {
  constructor(private readonly checkByCpf: CheckByCpf) { }

  @Get('check-cpf')
  async handle(@Query() cpf: string, @Res() res: Response) {
    const get = await this.checkByCpf.check(cpf)
    return get
      ? res
        .status(HttpStatus.ACCEPTED)
        .send({ message: get, statusCode: HttpStatus.ACCEPTED })
      : res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .send({ message: get, statusCode: HttpStatus.NOT_ACCEPTABLE })
  }
}
