import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuestionDTO } from '../dto/create-question.dto';
import { GetQuestionDTO } from '../dto/get-question.dto';
import { ListQuestionsDTO } from '../dto/list-questions.dto';
import { UpdateQuestionDTO } from '../dto/update-question.dto';
import { QuestionsService } from '../services/questions.service';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  async createQuestion(@Body() data: CreateQuestionDTO) {
    try {
      return await this.questionsService.createQuestion(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  async getQuestion(@Query() data: GetQuestionDTO) {
    try {
      return await this.questionsService.getQuestion(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch()
  async updateQuestion(@Body() data: UpdateQuestionDTO) {
    try {
      return await this.questionsService.updateQuestion(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('list')
  async listQuestions(@Query() data: ListQuestionsDTO) {
    try {
      return await this.questionsService.listQuestions(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
