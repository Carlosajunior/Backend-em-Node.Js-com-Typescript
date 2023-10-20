import { UploadService } from "@/modules/common/shared/services"
import { NotAcceptableException, NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { mockProfilesRepository } from "../mocks"
import { ProfilesRepository } from "../repositories"
import { ProfilePhotoService } from "./profile-photo.service"

describe('ProfilePhotoService', () => {
    let profilePhotoService: ProfilePhotoService
    let profileRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProfilePhotoService,
                UploadService,
                { provide: ProfilesRepository, useFactory: mockProfilesRepository }
            ]
        }).compile()

        profilePhotoService = module.get<ProfilePhotoService>(ProfilePhotoService)
        profileRepository = module.get<ProfilesRepository>(ProfilesRepository)
    })

    describe('saveProfilePhoto', () => {

        test("Should return NotAcceptableException if photo field is null.", async () => {
            const savePhoto = await profilePhotoService.saveProfilePhoto({ id: "test" }, null)
            expect(savePhoto).toEqual(new NotAcceptableException)
        })

    })
})