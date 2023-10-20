import { PartialType } from '@nestjs/mapped-types';
import { CreatePostJobInterviewDto } from './create-post-job-interview.dto';

export class UpdatePostJobInterviewDto extends PartialType(CreatePostJobInterviewDto) {}
