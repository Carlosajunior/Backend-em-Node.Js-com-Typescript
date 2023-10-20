import { RequestContext } from '@/modules/common/auth/middlewares';
import { ContactRepository } from '@/modules/customers/contact/repositories/contact.repository';
import { Customer } from '@/modules/customers/entities/customer.entity';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import Offer from '../entities/offer.entity';
import { OfferRepository } from '../repositories/offer.repository';
import { OfferDTO } from './../dtos/offer.dto';

@Injectable()
export class CreateOfferService {
  public constructor(
    private customerContactRepository: ContactRepository,
    private offerRepository: OfferRepository,
    private vacancyRepository: VacancyRepository
  ) { }

  public async execute(request: OfferDTO): Promise<Offer> {
    try {
      let customer: Customer;
      const user = await RequestContext.currentUser();
      const loggedUser = `${user.name} ${user.middle_name}`;

      if (loggedUser !== request.recruiter_name) {
        throw new Error('O usuário atual não é o recrutador informado.');
      }

      const vacancy = await this.vacancyRepository.findOne(
        { id: request.vacancy_id },
        {
          relations: ['customer']
        }
      );

      if (!vacancy) {
        throw new Error('Não foi possível encontrar a vaga informada.');
      }

      // if (vacancy.created_by !== request.commercial_name) {
      //   throw new Error(
      //     'O comercial atual não é o mesmo cadastrado para a vaga.'
      //   );
      // }

      if (vacancy?.customer) {
        customer = vacancy?.customer;
        if (request?.customer_contact_id) {
          const customerContact = await this.customerContactRepository.findOne({
            id: request.customer_contact_id
          });

          if (!customerContact) {
            throw new Error('O contato do cliente informado não existe.');
          }

          if (customerContact.customerId !== customer.id) {
            throw new Error(
              'O contato do cliente informado não pertence ao cliente da vaga.'
            );
          }
        }
      }

      return await this.offerRepository.createOffer(request);
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }
}
