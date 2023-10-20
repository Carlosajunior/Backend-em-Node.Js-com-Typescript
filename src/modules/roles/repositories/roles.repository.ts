import { EntityRepository, ILike, Repository } from "typeorm";
import { GetRolesDTO } from "../dto/get-roles.dto";
import { Roles } from "../entities/roles.entity";

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles>{

    async listRoles(data: GetRolesDTO) {
        let last_page: number;
        if (data.page) {
            if ((data.page - 1) * data.records_per_page > 0) {
                last_page = data.page - 1;
            }
        }
        const roles = await this.findAndCount({
            order: {
                name: 'ASC'
            },
            select: [
                'id',
                'name',
                'status'
            ],
            where: [
                { name: ILike(`%${data.search}%`) },
                { description: ILike(`%${data.search}%`) }
            ],
            take: data.records_per_page ? data.records_per_page : 15,
            skip: data.page ? (data.page - 1) * data.records_per_page : null
        })
        return {
            results: roles[0],
            page: data.page,
            last_page: last_page,
            total_results_per_page: data.records_per_page ? data.records_per_page : 5,
            total_results: roles[1],
            total_pages: Math.ceil(roles[1] / (data.records_per_page ? data.records_per_page : 5))
        };
    }

    async findRole(id: string) {
        return await this.findOne({
            where: { id: id },
            select: [
                'id',
                'name',
                'status'
            ],
        })
    }

    async getRoleDetails(id: string) {
        return await this.findOne({
            where: { id: id },
            select: [
                'id',
                'name',
                'status',
                'description'
            ],
            relations: ['users']
        })
    }
}