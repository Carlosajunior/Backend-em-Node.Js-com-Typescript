import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateConfigurationMatchPercentageDTO } from '../dto/update-configuration.dto';
import { ConfigurationsRepository } from '../repositories/configurations.repository';

@Injectable()
export class ConfigurationsService {
  constructor(private readonly configurationRepository: ConfigurationsRepository) { }

  async editMatchPercentage(data: UpdateConfigurationMatchPercentageDTO) {
    try {
      return await this.configurationRepository.update({ configuration_name: "match_percentage" }, { configuration: data.configuration })
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
