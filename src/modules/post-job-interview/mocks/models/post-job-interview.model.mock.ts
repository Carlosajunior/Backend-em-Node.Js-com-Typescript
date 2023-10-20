import { datatype } from "faker";
import { PostJobInterviewModel } from "../../models/post-job-interview.model";

export const mockPostJobInterviewModel = (): PostJobInterviewModel => ({
    id: datatype.number(),
    name: datatype.string(),
    created_at: new Date(),
    updated_at: new Date(),
    index: datatype.number()
})