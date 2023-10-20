import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { ListEntitiesModel } from '../../shared/models/list-entities.model';

export interface ElasticProfessionalProfile extends Profile {
  adhesion?: number;
  is_new: boolean;
  _score: number;
}

export interface ElasticListProfessionals
  extends ListEntitiesModel<ElasticProfessionalProfile> {
  total_count?: number;
  total_of_imports_last_week?: number;
}
