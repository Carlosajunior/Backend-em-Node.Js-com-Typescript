import { EntityRepository, Repository } from 'typeorm';
import { Squad } from '../entities/squad.entity';

@EntityRepository(Squad)
export class SquadRepository extends Repository<Squad> {}
