import { Test, TestingModule } from '@nestjs/testing'
import { AttachmentsRepository } from '../repositories'
import { mockAttachmentsRepository, mockDeleteAttachmentsDTO } from '../mocks'
import { datatype } from 'faker'
import { INestApplication, HttpService, HttpModule } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { AttachmentController } from '../controllers'
import { UploadService } from '@/modules/common/shared/services'
import { AttachmentService } from './attachment.service'
import { mockAttachmentModel } from '../mocks/models/attachment.model.mock'

describe('AttachmentService', () => {
  let attachmentService: AttachmentService
  let attachmentsRepository: any
  let httpService: HttpService
  let app: INestApplication
  const setId = datatype.number()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AttachmentService,
        UploadService,
        { provide: AttachmentsRepository, useFactory: mockAttachmentsRepository }
      ],
      controllers: [
        AttachmentController
      ]
    }).compile()

    attachmentService = module.get<AttachmentService>(AttachmentService)
    attachmentsRepository = module.get<AttachmentsRepository>(AttachmentsRepository)
    app = module.createNestApplication()
    httpService = module.get<HttpService>(HttpService)
    await app.init()
  })

  it('should be defined', () => {
    expect(attachmentService).toBeDefined();
  });

  it('should list profile attachments', async () => {
    const attachments = [mockAttachmentModel()]
    attachmentsRepository.listAttachmentsByProfile = jest.fn().mockResolvedValue(attachments)
    const result = await attachmentService.listAllProfileAttachments(datatype.string())
    expect(result).toEqual(attachments)
  });


  describe('Delete', () => {
    test('should endpoint call', async () => {
      const result: AxiosResponse = {
        data: mockDeleteAttachmentsDTO,
        status: 200,
        statusText: 'true',
        headers: {},
        config: {}
      }
      jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(result))
      httpService.delete(`/attachment/${setId}`).subscribe((res => {
        expect(res.status).toEqual(200)
      }))
    }, 40000)
    test('should delete attachment', async () => {
      const id = datatype.string()
      attachmentsRepository.deleteAttachments.mockResolvedValue(id)
      const get = await attachmentService.delete(id)
      expect(get).toBeTruthy()
    })
  })
})
