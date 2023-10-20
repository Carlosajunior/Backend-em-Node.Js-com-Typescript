import { LocationHelper } from '@/modules/common/shared/utils/location.helper';
import { Vacancy } from '../entities/vacancy.entity';
import { VacancyModel } from '../models/vacancy.model';

interface VacancyRaw extends Vacancy {
  total_candidates?: number;
  total_sent_to_client?: number;
}

export class VacancyMapper {
  public static toMap(raw: VacancyRaw): VacancyModel {
    return {
      contract_model: raw.contract_model,
      city: raw.city,
      commercial: raw?.commercial ? raw?.commercial : null,
      created_at: raw.created_at,
      customer: raw?.customer,
      funnel_id: raw?.funnel_id,
      id: raw.id,
      identify: raw.identify,
      location: LocationHelper.create(raw.city, raw.state),
      partner_company: raw.partner_company,
      qtd_apply: raw.qtd_apply,
      recruiter: raw?.recruiter ? raw?.recruiter : null,
      service: raw.service,
      state: raw.state,
      status: raw.status,
      time_purchase: +raw.time_purchase?.toString()?.trim(),
      time_purchase_clt: +raw.time_purchase_clt?.toString()?.trim(),
      time_purchase_pj: +raw.time_purchase_pj?.toString()?.trim(),
      time_sale_value: +raw.time_sale_value?.toString()?.trim(),
      time_sale_value_clt: +raw.time_sale_value_clt?.toString()?.trim(),
      time_sale_value_pj: +raw.time_sale_value_pj?.toString()?.trim(),
      title: raw.title,
      total_candidates: null,
      total_sent_to_client: raw?.total_sent_to_client,
      updated_at: raw.updated_at,
      work_model: raw.work_model,
      desc: raw.desc,
      advantages: raw.advantages,
      desirable: raw.desirable,
      requirements: raw.requirements,
      create_at: raw.create_at,
      expire_at: raw.expire_at,
      experience: raw.experience,
      project_time: raw.project_time,
      complement_values: raw.complement_values,
      complement_values_pj: raw.complement_values_pj,
      complement_values_clt: raw.complement_values_clt,
      status_comments: raw.status_comments,
      category_id: raw.category_id,
      customer_id: raw.customer_id,
      commercial_id: raw.commercial_id,
      contact_id: raw.contact_id,
      recruiter_id: raw.recruiter_id,
      conferred: raw.conferred,
      category: raw.category,
      contact: raw.contact,
      funnel: raw.funnel,
      tags: raw.tags,
      message: raw.message,
      notes: raw.notes

    };
  }
}
