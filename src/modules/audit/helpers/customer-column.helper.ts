import { CustomerFields } from '@/modules/audit/constants'

export const getCustomerColumnName = (column: CustomerFields) => {
  switch (column) {
    case CustomerFields.name:
      return 'nome'
    case CustomerFields.document:
      return 'cnpj'
    case CustomerFields.phone:
      return 'telefone'
    case CustomerFields.email:
      return 'e-mail'
    case CustomerFields.state:
      return 'estado'
    case CustomerFields.city:
      return 'cidade'
    case CustomerFields.active:
      return 'status'
    case CustomerFields.logoId:
      return 'logo'
    case CustomerFields.notes:
      return 'observações'
  }
}
