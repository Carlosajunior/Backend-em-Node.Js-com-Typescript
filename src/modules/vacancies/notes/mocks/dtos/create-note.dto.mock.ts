import { datatype } from "faker";
import { CreateNoteDto } from "../../dto/create-note.dto";

export const mockCreateNoteDTO = (): CreateNoteDto => ({
    notes: datatype.string(),
    vacancy_id: datatype.number(),
    customer: datatype.string(),
    user_id: datatype.string()
})