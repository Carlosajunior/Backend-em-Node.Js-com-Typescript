import { MessageFields } from '@/modules/audit/constants'

export const getMessageColumnName = (column: MessageFields) => {
  switch (column) {
    case MessageFields.title:
      return 'título'
    case MessageFields.content:
      return 'conteúdo da mensagem'
    case MessageFields.types:
      return 'tipos de envio'
    case MessageFields.sender_name:
      return 'nome do remetente'
    case MessageFields.sender_email:
      return 'e-mail do remetente'
  }
}
