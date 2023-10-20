import { RequestContext } from '@/modules/common/auth/middlewares';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateObservationRequestDTO } from '../dtos/save-observation.dto';
import { ObservationService } from '../services';
import { CreateObservationService } from '../services/create-observation.service';
import { DeleteObservationService } from '../services/delete-observation.service';

@Controller('observation')
@ApiTags("observation")
export class ObservationController {
  constructor(
    private readonly observationService: ObservationService,
    private readonly createObservationService: CreateObservationService,
    private readonly deleteObservationService: DeleteObservationService
  ) { }

  @Get('/profile/:id')
  async getProfileObservations(@Param('id') id: string, @Res() res: Response) {
    try {
      const observations =
        await this.observationService.listAllProfileObservations(id);
      res.status(HttpStatus.OK).send(observations);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('/profile/:id')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.deleteObservationService.execute(id);
      return res.status(204).json({});
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post()
  public async create(
    @Body() data: CreateObservationRequestDTO,
    @Res() res: Response
  ) {
    try {
      const currentUser = RequestContext.currentUser();
      const observation = await this.createObservationService.execute({
        ...data,
        user: `${currentUser.name} ${currentUser.middle_name}`
      });

      return res.status(200).json(observation);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
