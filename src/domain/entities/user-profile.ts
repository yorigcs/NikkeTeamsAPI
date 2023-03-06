export class UserProfile {
  initials = ''
  constructor (readonly name: string) {
    this.setInitials()
  }

  setInitials (): void {
    this.initials = this.name.split(' ').map(partialName => partialName[0]?.toUpperCase()).slice(0, 2).join('')
  }
}
