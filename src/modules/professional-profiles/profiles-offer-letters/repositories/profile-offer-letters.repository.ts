import { EntityRepository, Repository } from "typeorm";
import { ProfileOfferLetters } from "../entities/profile-offer-letters.entity";

@EntityRepository(ProfileOfferLetters)
export class ProfileOfferLettersRepository extends Repository<ProfileOfferLetters>{ }