export interface SaveAccountRepository {
  save: (input: SaveAccountRepository.Input) => Promise<SaveAccountRepository.Output>
}

export namespace SaveAccountRepository {
  export type Input = {
    id?: string
    name: string
    email: string
    password: string
    picture: string
  }

  export type Output = { sucess: boolean }

}
