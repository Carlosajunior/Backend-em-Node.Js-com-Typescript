import { Test, TestingModule } from '@nestjs/testing'

import { mockCreateProfileDTO } from '@/modules/professional-profiles/profiles/mocks'
import { CheckByCpf } from '.'

describe('CheckByCpf', () => {
  let checkByCpf: CheckByCpf

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckByCpf
      ]
    }).compile()

    checkByCpf = module.get<CheckByCpf>(CheckByCpf)
  })

  describe('CheckByCpf', () => {
    test('should return false if cpf 999.999.999-99', async () => {
      const profile = mockCreateProfileDTO()
      const get = await checkByCpf.check({ cpf: profile.cpf })
      expect(get).toBe(false)
    })

    test('should return true if correct cpf', async () => {
      const get = await checkByCpf.check({ cpf: '378.596.850-78' })
      expect(get).toBe(true)
    })

    test('should return true if repeat digit', async () => {
      const get = await checkByCpf.check({ cpf: '00000000000' })
      expect(get).toBe(false)
    })

    test('should check string containing', async () => {
      const get = await checkByCpf.check({ cpf: 123 })
      expect(get).toBe(false)
    })
  })
})
