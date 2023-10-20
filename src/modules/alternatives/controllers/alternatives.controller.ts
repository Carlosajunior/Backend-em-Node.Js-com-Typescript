import { BadRequestException, Body, Controller, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateAlternativeDTO } from "../dto/create-alternative.dto";
import { UpdateAlternativeDTO } from "../dto/update-alternative.dto";
import { AlternativesService } from "../services/alternatives.service";

@Controller('alternatives')
@ApiTags('alternatives')
export class AlternativesController {
    constructor(private readonly alternativesService: AlternativesService) { }

    @Post()
    async createAlternative(@Body() data: CreateAlternativeDTO) {
        try {
            return await this.alternativesService.createAlternative(data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Patch()
    async updateAlternative(@Body() data: UpdateAlternativeDTO) {
        try {
            return await this.alternativesService.updateAlternative(data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}