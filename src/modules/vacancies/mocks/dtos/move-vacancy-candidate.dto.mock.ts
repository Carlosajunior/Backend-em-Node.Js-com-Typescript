import { datatype } from "faker";
import { MoveVacancyCandidateDTO } from "../../services/move-vacancy-candidate.service";

export const mockMoveVacancyCandidateDTO = (): MoveVacancyCandidateDTO => ({
    vacancy_id: datatype.number(),
    observation_id: datatype.uuid(),
    old_observation_id: datatype.uuid()
})