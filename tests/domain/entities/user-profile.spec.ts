export class UserProfile {
  initials?: string
  constructor (readonly name: string) {
    this.setInitials()
  }

  setInitials (): void {
    this.initials = this.name.split(' ').map(partialName => partialName[0]?.toUpperCase()).slice(0, 2).join('')
  }
}

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
