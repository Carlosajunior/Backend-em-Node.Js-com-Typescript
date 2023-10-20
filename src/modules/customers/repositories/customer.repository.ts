import { DateTime } from 'luxon';
import { EntityRepository, ILike, Repository } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { FindQuery } from '../interface/find-query.interface';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  // Consultar um customer pelo UUID
  async findCustomerByIds(customerId: string[]): Promise<Customer[]> {
    const promises = customerId.map(
      async (langId) => await this.findOne(langId)
    );
    const getLangs = await Promise.all(promises);
    return getLangs.filter((lang) => Boolean(lang));
  }

  async createCustomer(data: CreateCustomerDto) {
    let newCustomerId: string;

    const newCustomer = this.create(data);

    const latestCustomerAdded = await this.findLatestCustomer();

    if (latestCustomerAdded) {
      newCustomerId = this.generateCustomerId(latestCustomerAdded.customerId);
    } else {
      newCustomerId = this.generateCustomerId();
    }

    newCustomer.customerId = newCustomerId;

    const customer = await this.save(newCustomer);
    return customer;
  }

  async listCustomersByQuery({
    name = '',
    records_per_page = '15',
    page = '1',
    active
  }: FindQuery) {

    let customersAndCount
    if (active) {
      customersAndCount = await this.findAndCount({
        relations: ['contacts', 'logo'],
        where: {
          name: ILike(`${name}%`),
          active: active ? Boolean(active) : true
        },
        take: records_per_page ? Number(records_per_page) : 15,
        skip: page ? (Number(page) - 1) * Number(records_per_page) : null,
        order: {
          created_at: 'DESC'
        }
      })
    }
    else if (!active) {
      customersAndCount = await this.findAndCount({
        relations: ['contacts', 'logo'],
        where: {
          name: ILike(`${name}%`)
        },
        take: records_per_page ? Number(records_per_page) : 15,
        skip: page ? (Number(page) - 1) * Number(records_per_page) : null,
        order: {
          created_at: 'DESC'
        }
      })
    }
    return {
      page,
      results: customersAndCount[0],
      total_results_per_page: records_per_page ? Number(records_per_page) : 15,
      total_results: customersAndCount[1],
      total_pages: Math.ceil(customersAndCount[1] / Number(records_per_page))
    };
  }

  async findExistingCustomerByFields(
    document?: string,
    email?: string,
    phone?: string
  ) {
    const customer = this.createQueryBuilder('customer');
    if (document) customer.andWhere(`customer.document ilike '%${document}%'`);
    if (email) customer.andWhere(`customer.email ilike '%${email}%'`);
    if (phone) customer.andWhere(`customer.phone ilike '%${phone}%'`).getOne();
    const results = await customer.getOne();
    if (results !== undefined) return { id: results.id, exists: true };
    else return { exists: false };
  }

  async updateCustomer(id: string, data: UpdateCustomerDto) {
    const customer = await this.findOne({
      where: {
        id
      },
      relations: ['logo']
    });

    delete data.contacts;

    const updateCustomer = this.create({ ...customer, ...data });

    await this.save(updateCustomer);
    return updateCustomer;
  }

  private async findLatestCustomer() {
    const last = await this.findOne({ order: { created_at: 'DESC' } });
    return last;
  }

  private generateCustomerId(latestCustomerId?: string) {
    let newCustomerId: string;
    const dateObj = DateTime.now();

    const currentMonth = dateObj.month.toString().padStart(2, '0');
    const currentYear = dateObj.year.toString().substring(2);

    if (
      !latestCustomerId ||
      (latestCustomerId &&
        latestCustomerId.slice(2, 4) !==
        dateObj.month.toString().padStart(2, '0'))
    ) {
      newCustomerId = currentYear.concat(currentMonth, '001');
      return newCustomerId;
    }

    const lastIdSequenceDigits = parseInt(latestCustomerId.slice(-3)) + 1;
    newCustomerId = currentYear.concat(
      currentMonth,
      lastIdSequenceDigits.toString().padStart(3, '0')
    );

    return newCustomerId;
  }

  async findCustomer(id: string) {
    return await this.find({
      where: {
        id: id
      }
    });
  }
}
