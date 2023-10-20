import { EntityRepository, Repository } from 'typeorm';

import { Observation } from '@/modules/professional-profiles/observations/entities';

@EntityRepository(Observation)
export class UpdateApplicationsRepository extends Repository<Observation> {

  async updateStage(id: any, data: any) {
    const applies = await this.findOne({ where: id });
    if (!applies) return ;
    Object.entries(data).map((items) => {
      if (items[0] === 'customers') return;
      applies[items[0]] = items[1];
    }); 

    await this.save(applies);

    return applies;
  }
}
