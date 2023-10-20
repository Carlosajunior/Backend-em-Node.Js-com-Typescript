import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMailLinkDossierDTO } from '../dtos/send-mail-link-dossier.dto';
import { SendMailLinkDossierService } from '../services/send-mail-link-dossier.service';

@Controller('dossiers/link')
@ApiTags('email link dossier')
export class EmailLinkDossierController {
  public constructor(
    private readonly sendMailLink: SendMailLinkDossierService
  ) {}

  @Post()
  @HttpCode(201)
  public async create(@Body() data: SendMailLinkDossierDTO) {
    return await this.sendMailLink.execute(data);
  }
}
