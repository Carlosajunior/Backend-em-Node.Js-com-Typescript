import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CustomerRepository } from '../../repositories/customer.repository';
import { CreateContactDTO } from '../dto/create-contact.dto';
import Contact from '../entities/contact.entity';
import { ContactRepository } from '../repositories/contact.repository';

@Injectable()
export class CreateCustomerContactService {
  public constructor(
    private readonly contactRepository: ContactRepository,
    private readonly customerRepository: CustomerRepository
  ) { }

  public async createCustomerContact(req: CreateContactDTO): Promise<Contact> {
    try {
      const customer = await this.customerRepository.findOne({
        where: {
          id: req.customer_id
        }
      });

      if (!customer) {
        throw new Error('É necessário informar um cliente válido.');
      }
      Object.assign(req, { active: true })
      const contact = this.contactRepository.create({
        ...req,
        customerId: req.customer_id
      });

      return await this.contactRepository.save(contact);
    } catch (e) {
      throw new NotAcceptableException(e);
    }
  }
}
