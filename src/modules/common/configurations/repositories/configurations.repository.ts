import { EntityRepository, Repository } from "typeorm";
import { Configurations } from "../entities/configurations.entity";

@EntityRepository(Configurations)
export class ConfigurationsRepository extends Repository<Configurations>{ }