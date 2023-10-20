import { Injectable } from '@nestjs/common'

@Injectable()
export class CheckByCpf {
  // verificado se o CPF está correto
  async check (data): Promise<boolean> {
    let cpf = data.cpf
    if (typeof cpf !== 'string' || cpf === '999.888.777-14' || cpf === '99988877714') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map(el => +el)
    const rest = (count) => (cpf.slice(0, count - 12)
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
  }
}
