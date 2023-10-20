import { EntityRepository, Repository } from 'typeorm';
import { ContactDto } from '../dto/contact.dto';
import Contact from '../entities/contact.entity';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
  async createContact(data: ContactDto) {
    const newCustomerContact = this.create(data)
    return this.save(newCustomerContact);
  }

  async createContactInBulk(data: ContactDto[]) {
    const created = Promise.all(
      data.map(async (contact) => {
        const createdContact = this.create(contact);
        return await this.save(createdContact);
      })
    );

    return created;
  }
}
