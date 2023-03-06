import { UserProfile } from '@/domain/entities'

describe('Profile', () => {
  it('initials should be TA', () => {
    const sut = new UserProfile('Teste a')
    expect(sut.initials).toBe('TA')
  })

  it('initials should be an empty string', () => {
    const sut = new UserProfile('')
    expect(sut.initials).toBe('')
  })
})
