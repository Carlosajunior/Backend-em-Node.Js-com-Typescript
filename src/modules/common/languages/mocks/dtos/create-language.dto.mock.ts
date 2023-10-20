import { datatype } from 'faker'
import { CreateLanguageDTO } from '../../dtos'
import { mockLanguageLevel } from '../constants'

export const mockCreateLanguageDTO = (): CreateLanguageDTO => ({
  language: datatype.string(),
  level: mockLanguageLevel()
})
