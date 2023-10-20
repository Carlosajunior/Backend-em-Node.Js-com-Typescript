import { datatype, random } from 'faker'

import { CreateTagDTO } from '@/modules/common/tags/dtos'
import { TagCategories } from '../../constants/tag-categories.constants'

export const mockCreateTagDTO = (): CreateTagDTO => ({
  name: "test tag name",
  category: random.arrayElement(Object.values(TagCategories))
})
