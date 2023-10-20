import { BadRequestException, Controller, Delete, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DeactivateProfileService } from "../services/deactive-profile.service";

@Controller('professional-profile')
@ApiTags("professional profiles")
export class DeactivateProfileController {
    constructor(private readonly deactivateProfileService: DeactivateProfileService) { }

    @Delete('deactivate/:id')
    async deactivateProfile(@Param('id') id: string) {
        try {
            return await this.deactivateProfileService.deactivateProfile(id)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}