import { Injectable } from '@nestjs/common'
import { Profile } from '../entities'
import { ProfilesRepository } from '../repositories'

@Injectable()
export class GenerateService {
  // Variavel para armazenamento do código
  generateCode: any
  constructor(
    private readonly profilesRepository: ProfilesRepository
  ) { }

  // Gerador do código
  async numberWizard(nowIdentify): Promise<string> {
    // Data atual
    const dateObj = new Date()
    // Mês atual formato MM
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    // Ano atual formato AA
    const year = dateObj.getFullYear().toString().substr(-2)
    // inexistente gera código AAMM0001
    this.generateCode = year + month + this.pad()
    let count = await this.profilesRepository.countProfileByIdentify(this.generateCode)
    while (count > 0) {
      this.generateCode = year + month + this.pad()
      count = await this.profilesRepository.countProfileByIdentify(this.generateCode)
    }
    await this.profilesRepository.updateProfileId(nowIdentify, { identify: this.generateCode })
    return this.generateCode
  }

  pad(): string {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const verify_number = Math.floor(Math.random() * 1000)
    return verify_number.toString()
  }
}
