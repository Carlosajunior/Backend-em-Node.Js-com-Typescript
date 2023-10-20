import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { AnswerQuestionDTO } from '../dto/answer-question.dto';
import { GetQuestionAnswersByProfileDTO } from '../dto/get-question-answers-by-profile.dto';
import { GetQuestionAnswersDTO } from '../dto/get-question-answers.dto';
import { UpdateAnswerDTO } from '../dto/update-answer.dto';
import { UpdateBulkAnswerDTO } from '../dto/update-bulk-answer.dto';
import { Answers } from '../entities/answer.entity';
import { AnswersRepository } from '../repositories/answers.repository';


@Injectable()
export class AnswersService {
    constructor(private readonly answersRepository: AnswersRepository) { }

    async createAnswer(data: AnswerQuestionDTO) {
        try {
            const answersArray: Array<Answers> = []
            for await (let answer of data.answers) {
                const answerObject = await this.answersRepository.create(answer)
                const createdAnswer = await this.answersRepository.save(answerObject)
                answersArray.push(createdAnswer)
            }
            return answersArray
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }

    async getQuestionAnswers(data: GetQuestionAnswersDTO) {
        try {
            let last_page: number;
            if (data.page) {
                if ((data.page - 1) * data.records_per_page > 0) {
                    last_page = data.page - 1;
                }
            }
            const answers = await this.answersRepository.findAndCount({
                relations: ['question'],
                order: {
                    created_at: 'DESC'
                },
                where: {
                    question_id: data.question_id
                },
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            });
            return {
                results: answers[0],
                page: data.page,
                last_page: last_page,
                total_results_per_page: data.records_per_page ? data.records_per_page : 15,
                total_results: answers[1],
                total_pages: Math.ceil(
                    answers[1] / (data.records_per_page ? data.records_per_page : 15)
                )
            };
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async updateAnswer(data: UpdateAnswerDTO) {
        try {
            const id = data.id
            delete data.id
            return await this.answersRepository.update({ id: id }, data)
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }

    async updateBulkAnswer(data: UpdateBulkAnswerDTO) {
        try {
            const answersArray: Array<UpdateResult> = []
            for await (let answer of data.answers) {
                const id = answer.id
                const profile_id = data.profile_id
                delete answer.id
                Object.assign(answer, { profile_id })
                const updatedAnswer = await this.answersRepository.update({ id: id }, answer)
                answersArray.push(updatedAnswer)
            }
            return answersArray
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }

    async getQuestionAnswersByProfile(data: GetQuestionAnswersByProfileDTO) {
        try {
            let last_page: number;
            if (data.page) {
                if ((data.page - 1) * data.records_per_page > 0) {
                    last_page = data.page - 1;
                }
            }
            const answers = await this.answersRepository.findAndCount({
                relations: ['question'],
                order: {
                    created_at: 'DESC'
                },
                where: {
                    profile_id: data.profile_id
                },
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            });
            return {
                results: answers[0],
                page: data.page,
                last_page: last_page,
                total_results_per_page: data.records_per_page ? data.records_per_page : 15,
                total_results: answers[1],
                total_pages: Math.ceil(
                    answers[1] / (data.records_per_page ? data.records_per_page : 15)
                )
            };
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}
