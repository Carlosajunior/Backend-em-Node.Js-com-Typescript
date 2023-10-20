import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimBodyTextPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null
  }

  private trim(values) {
    Object.keys(values).forEach(key => {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key])
        } else {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim()
          }
        }
    })
    return values
  }

  transform(values, metadata) {
    const { type } = metadata
    if (this.isObj(values) && type === 'body') {
      return this.trim(values)
    } else {
      return values
    }

    throw new BadRequestException('Validation failed')
  }
}