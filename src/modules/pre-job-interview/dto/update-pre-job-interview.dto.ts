import { PartialType } from '@nestjs/mapped-types';
import { CreatePreJobInterviewDto } from './create-pre-job-interview.dto';

export class UpdatePreJobInterviewDto extends PartialType(CreatePreJobInterviewDto) {}
