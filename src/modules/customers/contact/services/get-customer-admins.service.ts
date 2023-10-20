import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { GetContactsQueryDTO } from '../dto/get-contacts-query.dto';
import Contact from '../entities/contact.entity';
import { ContactRepository } from '../repositories/contact.repository';

interface Request extends GetContactsQueryDTO {
  customer_id: string;
}

@Injectable()
export class GetCustomerAdminsService {
  public constructor(private readonly contactRepository: ContactRepository) { }

  public async getCustomerAdmins(req: Request): Promise<Contact[]> {
    try {
      if (!isUUID(req.customer_id)) {
        throw new BadRequestException('O id informado não é um uuid válido');
      }
      const contacts = this.contactRepository.find({
        where: {
          customerId: req.customer_id,
          is_admin: req?.is_admin || false
        }
      });
      return contacts;
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
