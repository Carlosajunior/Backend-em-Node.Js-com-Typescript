import { EntityRepository, Repository } from "typeorm";
import { PreJobInterview } from "../entities/pre-job-interview.entity";

@EntityRepository(PreJobInterview)
export class PreJobInterviewRepository extends Repository<PreJobInterview>{

    async findAll() {
        return await this.find()
    }
}