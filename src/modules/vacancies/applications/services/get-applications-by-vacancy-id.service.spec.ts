import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService, INestApplication } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { GetApplicationsByVacancyIdController } from '../controllers/get-applications-by-vacancy-id.controller';
import { mockApplicationsDTO, mockApplicationsRepository } from '../mocks';
import { ApplicationsRepository } from '../repositories';
import { GetApplicationsByVacancyIdService } from '.';
import { ApplyDTO } from '../dtos';

describe('SimpleService', () => {
  let getApplicationsByVacancyIdService: GetApplicationsByVacancyIdService;
  let applicationsRepository: any;
  let httpService: HttpService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GetApplicationsByVacancyIdService,
        {
          provide: ApplicationsRepository,
          useFactory: mockApplicationsRepository
        }
      ],
      controllers: [GetApplicationsByVacancyIdController]
    }).compile();

    getApplicationsByVacancyIdService =
      module.get<GetApplicationsByVacancyIdService>(
        GetApplicationsByVacancyIdService
      );
    applicationsRepository = module.get<ApplicationsRepository>(
      ApplicationsRepository
    );
    app = module.createNestApplication();
    httpService = module.get<HttpService>(HttpService);
    await app.init();
  });

  describe('ListVacancies from simple query', () => {
    test('should endpoint call', async () => {
      const params = mockApplicationsDTO();
      const result: AxiosResponse = {
        data: JSON.stringify(params),
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        config: {}
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
      httpService
        .get('/applications?id=1&records_limit=10')
        .subscribe((res) => {
          expect(res.status).toEqual(200);
        });
    });
    test('When calling the list, return the repository structure if there is no parameter', async () => {
      const params: ApplyDTO = {
        vacancy_id: 0,
        records_per_page: 5,
      };
      await getApplicationsByVacancyIdService.list(params, ["Administrador"]);

      expect(applicationsRepository.findVacancies).toHaveBeenCalledWith({
        vacancy_id: 0,
        records_per_page: 5,
      });
    });
    /* 
    test('When calling the list, return the repository structure if there is correct parameter', async () => {
      const params = mockSimpleDTO()
      await simpleService.list(params)

      expect(simpleRepository.findVacancies).toHaveBeenCalledWith(params)
    }) */
  });
});
