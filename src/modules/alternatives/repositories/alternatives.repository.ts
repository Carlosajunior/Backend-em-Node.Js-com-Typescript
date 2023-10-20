import { EntityRepository, Repository } from "typeorm";
import { Alternatives } from "../entities/alternative.entity";

@EntityRepository(Alternatives)
export class AlternativesRepository extends Repository<Alternatives>{ }