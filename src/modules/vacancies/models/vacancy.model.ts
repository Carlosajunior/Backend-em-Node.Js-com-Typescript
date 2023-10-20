import { Categories } from '@/modules/categories/entities';
import { Tag } from '@/modules/common/tags/entities';
import Contact from '@/modules/customers/contact/entities/contact.entity';
import { State } from '@/modules/customers/entities/customer.entity';
import { CustomerModel } from '@/modules/customers/model/customer.model';
import Funnel from '@/modules/funnel/entities/funnel.entity';
import { Message } from '@/modules/messages/entities';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Experience } from '../constants/experience.constant';
import { VacancyService } from '../constants/vacancy-service.constants';
import { WorkModel } from '../constants/work-model.constant';
import { Note } from '../notes/entities/note.entity';

export type VacancyModel = {
  contract_model: string;
  city: string;
  commercial: User;
  created_at: Date;
  customer: CustomerModel;
  funnel_id: string;
  id: number;
  identify: string;
  location: string;
  partner_company: string;
  qtd_apply: number;
  recruiter: User;
  service: VacancyService;
  state: State;
  status: string;
  time_purchase: number;
  time_purchase_clt: number;
  time_purchase_pj: number;
  time_sale_value: number;
  time_sale_value_clt: number;
  time_sale_value_pj: number;
  title: string;
  total_candidates: number;
  total_sent_to_client: number;
  updated_at: Date;
  work_model: WorkModel;
  desc: string;
  requirements: string
  desirable: string
  advantages: string
  create_at: Date
  expire_at: Date
  experience: Experience
  project_time: string
  complement_values: string
  complement_values_pj: string
  complement_values_clt: string
  status_comments: string
  category_id: number
  customer_id: string
  commercial_id: string
  contact_id: string
  recruiter_id: string
  conferred: boolean
  category: Categories
  contact: Contact
  funnel: Funnel
  tags: Tag[]
  message: Message[]
  notes: Note[]
  observations?: Observation[]
}
