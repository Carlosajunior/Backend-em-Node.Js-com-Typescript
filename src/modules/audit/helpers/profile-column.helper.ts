import { ProfileFields } from '../constants'

export const getColumnName = (column: ProfileFields) => {
  switch (column) {
    case ProfileFields.name:
      return 'nome'
    case ProfileFields.phone:
      return 'telefone'
    case ProfileFields.email:
      return 'e-mail'
    case ProfileFields.cpf:
      return 'CPF'
    case ProfileFields.birthdate:
      return 'data de nascimento'
    case ProfileFields.mother_name:
      return 'nome da mãe'
    case ProfileFields.gender:
      return 'gênero'
    case ProfileFields.homeoffice:
      return 'somente remoto'
    case ProfileFields.uds:
      return 'profissional uds'
    case ProfileFields.impedido:
      return 'profissional impedido'
    case ProfileFields.open_to_work:
    return 'open to work'
    case ProfileFields.verified:
      return 'verificado'
    case ProfileFields.cep:
      return 'CEP'
    case ProfileFields.state:
      return 'estado'
    case ProfileFields.city:
      return 'cidade'
    case ProfileFields.accept_contract:
      return 'tipo de contratação'
    case ProfileFields.clt_claim:
      return 'pretenção CLT'
    case ProfileFields.pj_claim:
      return 'pretenção PJ'
    case ProfileFields.professional_title:
      return 'título do profissional'
    case ProfileFields.professional_about:
      return 'sobre o profissional'
    case ProfileFields.quati_result:
      return 'anexo de perfil comportamental QUATI'
    case ProfileFields.disc2_result:
      return 'anexo de perfil comportamental DISC2'
  }
}
