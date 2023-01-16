export interface SaveAccountRepository {
  save: (input: SaveAccountRepository.Input) => Promise<void>
}

export namespace SaveAccountRepository {
  export type Input = {
    id: string
    name: string
    email: string
    password: string
    picture: string
  }

}

export interface LoadAccountByEmailRepository {
  load: (input: LoadAccountByEmailRepository.Input) => Promise<LoadAccountByEmailRepository.Output>
}

export namespace LoadAccountByEmailRepository {
  export type Input = { email: string }
  export type Output = boolean
}
