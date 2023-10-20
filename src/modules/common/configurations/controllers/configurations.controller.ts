import { Controller, Body, Patch, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateConfigurationMatchPercentageDTO } from '../dto/update-configuration.dto';
import { ConfigurationsService } from '../services/configurations.service';

@Controller('configurations')
@ApiTags('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) { }

  @ApiTags('edit match percentage')
  @Patch('match_percentage')
  async changeMatchPercentage(@Body() data: UpdateConfigurationMatchPercentageDTO) {
    try {
      await this.configurationsService.editMatchPercentage(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
