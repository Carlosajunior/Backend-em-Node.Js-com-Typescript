import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { GetContactsQueryDTO } from '../dto/get-contacts-query.dto';
import { CreateCustomerContactService } from '../services/create-customer-contact.service';
import { GetCustomerAdminsService } from '../services/get-customer-admins.service';

@Controller('contacts/customer')
@ApiTags("contacts")
export class CustomerContactsController {
  constructor(
    private readonly createCustomerContactService: CreateCustomerContactService,
    private readonly getCustomerAdmins: GetCustomerAdminsService
  ) { }

  @Get(':customer_id')
  public async show(@Param('customer_id') customer_id: string, @Query() query: GetContactsQueryDTO) {
    try {
      return this.getCustomerAdmins.getCustomerAdmins({
        customer_id,
        ...query
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() data: CreateContactDTO) {
    try {
      return await this.createCustomerContactService.createCustomerContact(data);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
