export interface Hasher {
  hash: (input: Hasher.Input) => Promise<Hasher.Output>
}

export namespace Hasher {
  export type Input = {
    plainText: string
  }
  export type Output = string
}

export interface HasherCompare {
  compare: (input: HasherCompare.Input) => Promise<HasherCompare.Output>
}

export namespace HasherCompare {
  export type Input = {
    plainText: string
    digest: string
  }

  export type Output = boolean
}
