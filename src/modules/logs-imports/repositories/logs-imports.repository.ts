import { EntityRepository, Repository } from "typeorm";
import { ImportsEnum } from "../constants/import.constants";
import { CreateImportDto } from "../dto/create-import.dto";
import { LogsImports } from "../entities/logs-imports.entity";

@EntityRepository(LogsImports)
export class LogsImportsRepository extends Repository<LogsImports>{

    async createLogImport(data: CreateImportDto) {
        const imports = await this.create(data)
        return await this.save(imports)
    }

    async updateLogImport(id: string, status: ImportsEnum) {
        return await this.update({ id: id }, { status: status })
    }
}