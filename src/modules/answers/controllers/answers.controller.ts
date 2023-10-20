import { Controller, Post, Body, BadRequestException, Get, Query, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnswerQuestionDTO } from '../dto/answer-question.dto';
import { GetQuestionAnswersByProfileDTO } from '../dto/get-question-answers-by-profile.dto';
import { GetQuestionAnswersDTO } from '../dto/get-question-answers.dto';
import { UpdateAnswerDTO } from '../dto/update-answer.dto';
import { UpdateBulkAnswerDTO } from '../dto/update-bulk-answer.dto';
import { AnswersService } from '../services/answers.service';

@Controller('answers')
@ApiTags('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) { }

  @Post()
  async createAnswer(@Body() data: AnswerQuestionDTO) {
    try {
      return await this.answersService.createAnswer(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  async getQuestionAnswers(@Query() data: GetQuestionAnswersDTO) {
    try {
      return await this.answersService.getQuestionAnswers(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('profile')
  async getQuestionAnswersByProfile(@Query() data: GetQuestionAnswersByProfileDTO) {
    try {
      return await this.answersService.getQuestionAnswersByProfile(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch()
  async updateAnswer(@Body() data: UpdateAnswerDTO) {
    try {
      return await this.answersService.updateAnswer(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch('bulk')
  async updateBulkAnswer(@Body() data: UpdateBulkAnswerDTO) {
    try {
      return await this.answersService.updateBulkAnswer(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
