import { EntityRepository, Repository } from 'typeorm';
import { UploadLogoDto } from '../dto/upload-logo.dto';
import Logo from '../entities/logo.entity';

@EntityRepository(Logo)
export class LogoRepository extends Repository<Logo> {
  async uploadFile(data: UploadLogoDto) {
    const newCustomerContact = this.create(data);
    return this.save(newCustomerContact);
  }
}
