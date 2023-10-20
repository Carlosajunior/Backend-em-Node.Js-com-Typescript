import { datatype } from "faker";
import { PreJobInterviewModel } from "../../models/pre-job-interview.model";

export const mockPreJobInterviewModel = (): PreJobInterviewModel => ({
    id: datatype.number(),
    name: datatype.string(),
    created_at: new Date(),
    updated_at: new Date()
})