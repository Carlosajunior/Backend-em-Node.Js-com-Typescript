import { datatype, random } from 'faker'

import { CreateTagDTO } from '@/modules/common/tags/dtos'
import { TagCategories } from '@/modules/common/tags/constants/tag-categories.constants'

export const mockCreateTagDTO = (): CreateTagDTO => ({
  name: datatype.string(),
  category: random.arrayElement(Object.values(TagCategories))
})
