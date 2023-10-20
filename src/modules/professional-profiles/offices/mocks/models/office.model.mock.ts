import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { OfficeModel } from "@/modules/professional-profiles/offices/models";
import { datatype } from "faker";

export const mockOfficeModel = (): OfficeModel => ({
  ...mockDefaultModel(),
  name: datatype.string(),
  duration: datatype.string(),
  location: datatype.string(),
  description: datatype.string(),
  current_position: datatype.string(),
  end_date: datatype.string(),
  initial_date: datatype.string(),
  experience_id: datatype.string(),
})