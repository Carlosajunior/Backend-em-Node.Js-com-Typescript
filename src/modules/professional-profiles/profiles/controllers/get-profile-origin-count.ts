import { Controller, Get, Headers, NotAcceptableException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetProfileOriginCountService } from "../services/get-profile-origin-count.service";

@Controller('professional-profiles')
@ApiTags("professional profiles")
export class GetProfileOriginCount {
    constructor(private readonly getProfileOriginCountService: GetProfileOriginCountService) { }

    @Get()
    async handle(@Headers("groups") headers: Array<string>) {
        if (headers?.includes("Administrador")) {
            return await this.getProfileOriginCountService.getProfileOriginCount()
        }
        return new NotAcceptableException()
    }
}