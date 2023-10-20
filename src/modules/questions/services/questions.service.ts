import { AlternativesRepository } from '@/modules/alternatives/repositories/alternatives.repository';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateQuestionDTO } from '../dto/create-question.dto';
import { GetQuestionDTO } from '../dto/get-question.dto';
import { ListQuestionsDTO } from '../dto/list-questions.dto';
import { UpdateQuestionDTO } from '../dto/update-question.dto';
import { QuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class QuestionsService {
    constructor(
        private readonly questionsRepository: QuestionsRepository,
        private readonly alternativesRepository: AlternativesRepository
    ) { }

    async createQuestion(data: CreateQuestionDTO) {
        try {
            const question = await this.questionsRepository.create({ title: data.title })
            await this.questionsRepository.save(question)
            if (data.alternatives != null) {
                for await (let alternative of data.alternatives) {
                    Object.assign(alternative, { question_id: question.id })
                    const new_alternative = await this.alternativesRepository.create(alternative)
                    await this.alternativesRepository.save(new_alternative)
                }
            }
            return question
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }

    async listQuestions(data: ListQuestionsDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null
            let questions = (await this.questionsRepository.findAndCount({
                where: {
                    status: true
                },
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            }))
            return {
                results: questions[0],
                page: data.page,
                last_page: last_page,
                total_results: questions[1],
                total_pages: Math.ceil(questions[1] / (data.records_per_page ? data.records_per_page : 15))
            };
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async getQuestion(data: GetQuestionDTO) {
        try {
            return await this.questionsRepository.findOne({
                relations: ['alternatives'],
                where: { id: data.id }
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async updateQuestion(data: UpdateQuestionDTO) {
        try {
            const id = data.id
            delete data.id
            const { name, middle_name } = RequestContext.currentUser();
            const updated_by = `${name} ${middle_name}`
            Object.assign(data, { updated_by: updated_by })
            return await this.questionsRepository.update({ id: id }, data)
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }
}
