import { EntityRepository, Repository } from "typeorm";
import { ProfilesTags } from "../entities/profiles-tags.entity";

@EntityRepository(ProfilesTags)
export class ProfilesTagsRepository extends Repository<ProfilesTags>{

}