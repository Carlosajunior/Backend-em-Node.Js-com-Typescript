import { datatype, internet } from 'faker'
import { DeleteAttachmentDTO } from '../../dtos'

export const mockDeleteAttachmentsDTO = (): DeleteAttachmentDTO => ({
  url: datatype.string(),
  profile_id: datatype.string(),
  name: datatype.string()
})
