export interface Hasher {
  hash: (params: Hasher.Input) => Promise<Hasher.Output>
}

export namespace Hasher {
  export type Input = {
    plainText: string
  }
  export type Output = string
}
