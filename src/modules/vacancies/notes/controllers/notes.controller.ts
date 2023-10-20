import { RequestContext } from '@/modules/common/auth/middlewares';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesService } from '../services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get('/vacancy/:id')
  async getVacancyNotes(@Param('id') id: string, @Res() res: Response) {
    try {
      const notes = await this.notesService.listAllVacancyNotes(+id);
      return res.status(HttpStatus.OK).send(notes);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const currentUser = RequestContext.currentUser();

      return this.notesService.remove(
        id,
        currentUser.email
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
