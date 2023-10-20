import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMailLinkDossierDTO } from '../dtos/send-mail-link-dossier.dto';

@Controller('dossier')
@ApiTags('dossier')
export class DossierController {
  @Post()
  public async create(@Body() data: SendMailLinkDossierDTO) {
    return;
  }
}
