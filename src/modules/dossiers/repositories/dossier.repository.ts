import { EntityRepository, Repository } from 'typeorm';
import { Dossier } from './../entities/dossier.entity';

@EntityRepository(Dossier)
export class DossierRepository extends Repository<Dossier> {}
