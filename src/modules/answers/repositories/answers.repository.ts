import { EntityRepository, Repository } from "typeorm";
import { Answers } from "../entities/answer.entity";

@EntityRepository(Answers)
export class AnswersRepository extends Repository<Answers>{ }