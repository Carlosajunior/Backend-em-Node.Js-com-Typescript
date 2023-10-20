import { EntityRepository, Repository } from 'typeorm';
import { OfferDTO } from '../dtos/offer.dto';
import Offer from '../entities/offer.entity';

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {
  public async createOffer(data: OfferDTO): Promise<Offer> {
    const offer = this.create({ ...data, status: 'ENVIADO' });

    return await this.save(offer);
  }
}
