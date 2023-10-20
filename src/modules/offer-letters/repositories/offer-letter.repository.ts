import { EntityRepository, Repository } from 'typeorm';
import { OfferLetter } from '../entities/offer-letter.entity';

@EntityRepository(OfferLetter)
export class OfferLetterRepository extends Repository<OfferLetter> {}
