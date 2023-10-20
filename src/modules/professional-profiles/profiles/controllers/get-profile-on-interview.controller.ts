import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetProfilesOnInterviewDTO } from "../dtos/get-profile-on-interview.dto";
import { GetProfilesOnInterviewAdvancedSearchDTO } from "../dtos/get-profiles-on-interview-advanced-search.dto";
import { GetProfilesOnInterviewService } from "../services/get-profile-on-interview.service";

@Controller('professional-profiles')
@ApiTags("professional profiles")
export class GetProfilesOnInterviewController {
    constructor(private readonly getProfilesOnInterviewService: GetProfilesOnInterviewService) { }

    @Get('profile-interview/list')
    async getProfilesOnInterview(@Query() data: GetProfilesOnInterviewDTO) {
        try {
            return await this.getProfilesOnInterviewService.getProfilesOnInterview(data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get('profile-interview/advanced-search')
    async getProfilesOnInterviewAdvancedSearch(@Query() data: GetProfilesOnInterviewAdvancedSearchDTO) {
        try {
            return await this.getProfilesOnInterviewService.getProfilesOnInterviewAdvancedSearch(data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}