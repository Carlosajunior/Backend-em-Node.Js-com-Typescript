import { Service } from '@/modules/common/shared/core/service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateVacancyIdentifierService
  implements Service<number, string>
{
  public execute(seq: number): string {
    const now = new Date();

    const fullYear = now.getFullYear().toString();
    const abbrYear = fullYear.substring(fullYear.length - 2, fullYear.length);

    const month = String(now.getMonth() + 1);

    const id = seq.toString().padStart(3, '0');

    return abbrYear + month + id;
  }
}
