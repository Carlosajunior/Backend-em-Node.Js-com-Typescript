import { VacancyFields } from '@/modules/audit/constants'

export const getVacancyColumnName = (column: VacancyFields) => {
  switch (column) {
    case VacancyFields.title:
      return 'título'
    case VacancyFields.desc:
      return 'descrição'
    case VacancyFields.service:
        return 'tipo de vaga'
    case VacancyFields.requirements:
      return 'requisitos da vaga'
    case VacancyFields.desirable:
      return 'requisitos desejáveis da vaga'
    case VacancyFields.advantages:
      return 'benefícios da vaga'
    case VacancyFields.conferred:
      return 'vaga conferida'
    case VacancyFields.create_at:
      return 'data de início do trabalho'
    case VacancyFields.expire_at:
      return 'data de expiração da vaga'
    case VacancyFields.work_model:
      return 'modalidade'
    case VacancyFields.state:
      return 'estado'
    case VacancyFields.city:
      return 'cidade'
    case VacancyFields.experience:
      return 'nível de experiência'
    case VacancyFields.project_time:
      return 'tempo de projeto'
    case VacancyFields.contract_model:
      return 'tipo de contratação'
    case VacancyFields.time_sale_value:
      return 'valor hora de venda'
    case VacancyFields.time_purchase:
      return 'remuneração'
    case VacancyFields.complement_values:
      return 'complemento de valores'
    case VacancyFields.time_sale_value_pj:
      return 'valor hora de venda - PJ'
    case VacancyFields.time_purchase_pj:
      return 'remuneração - PJ'
    case VacancyFields.complement_values_pj:
      return 'complemento de valores - PJ'
    case VacancyFields.time_sale_value_clt:
      return 'valor hora de venda - CLT'
    case VacancyFields.time_purchase_clt:
      return 'remuneração - CLT'
    case VacancyFields.complement_values_clt:
      return 'complemento de valores - CLT'
    case VacancyFields.status:
      return 'status'
    case VacancyFields.status_comments:
      return 'motivo'
    case VacancyFields.qtd_apply:
      return 'quantidade de vagas'
  }
}
