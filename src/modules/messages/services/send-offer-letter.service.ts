import config from '@/config/aws';
import { OfferLetterRepository } from '@/modules/offer-letters/repositories/offer-letter.repository';
import { ProfileOfferLettersRepository } from '@/modules/professional-profiles/profiles-offer-letters/repositories/profile-offer-letters.repository';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { Injectable } from "@nestjs/common/decorators";
import SES from "aws-sdk/clients/ses";
import { SendOfferLetterDTO } from '../dtos/send-offer-letter.dto';
import { TemplateRepository } from '@/modules/templates/repositories/template.repository';
import { NotAcceptableException, NotFoundException } from '@nestjs/common/exceptions';
import { OfferLetterStatusEnum } from '@/modules/professional-profiles/profiles-offer-letters/constants/offer-letter-status.constant';
const { aws } = config;

@Injectable()
export class SendOfferLetterService {
    constructor(
        private readonly offerLetterRepository: OfferLetterRepository,
        private readonly profileRepository: ProfilesRepository,
        private readonly profileOfferLettersRepository: ProfileOfferLettersRepository,
        private readonly templatesRepository: TemplateRepository
    ) { }

    client = new SES({
        region: 'us-east-1',
        accessKeyId: aws.accessKeyId,
        secretAccessKey: aws.secretAccessKey
    });

    async execute(data: SendOfferLetterDTO, cb?: () => void) {
        try {
            const template = await this.templatesRepository.findOne({
                where: {
                    id: data.template_id
                }
            })
            const offer_letter_template = (await this.offerLetterRepository.findOne({
                where: {
                    id: data.offer_letter_id
                }
            }))
            if (!template.description.includes('{{link}}')) {
                throw new NotAcceptableException('O template não possui campo para o link da carta oferta.')
            }
            const profile = await this.profileRepository.findOne({
                where: {
                    id: data.profile_id
                }
            })
            const validate = await this.verifyCanReceiveOfferLetter(data.profile_id, data.vacancy_id)
            if (validate.length > 0)
                throw new NotAcceptableException(`Já há cartas ofertas em aberto para esse profissional, nessa vaga: ${validate}`)
            template.description = template.description.replace('{{link}}', `${process.env.JOB_PORTAL_URL}/offer-letter/${offer_letter_template.offer_letter_template_id}`)
            template.description = template.description.replace('{{name}}', `${profile.name}`)
            await this.client
                .sendEmail({
                    Source: `${data.sender.name} <${data.sender.email}>`,
                    Destination: {
                        ToAddresses: [`${profile.name} <${profile.email}>`]
                    },
                    Message: {
                        Subject: {
                            Data: template.title
                        },
                        Body: {
                            Html: {
                                Data: template.description
                            }
                        }
                    }
                })
                .promise();
            const profile_offer_letter = await this.profileOfferLettersRepository.create({
                profile_id: data.profile_id,
                offer_letter_id: data.offer_letter_id,
                offer_letter_content: template.description,
                sent_by: data.sender.name,
                status: OfferLetterStatusEnum.Enviada,
                vacancy_id: data.vacancy_id
            })
            await this.profileOfferLettersRepository.save(profile_offer_letter)
            cb?.();
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }

    public async verifyCanReceiveOfferLetter(profile_id: string, vacancy_id: number) {
        try {
            return await this.profileOfferLettersRepository.find({
                where: {
                    profile_id: profile_id,
                    vacancy_id: vacancy_id,
                    status: OfferLetterStatusEnum.Aceita
                }
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}