export interface Uuid {
  generate: (input: Uuid.Input) => Uuid.Output
}

export namespace Uuid {
  export type Input = { key: string }
  export type Output = string
}
