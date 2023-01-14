export interface Uuid {
  generate: (input: Uuid.Input) => Promise<Uuid.Output>
}

export namespace Uuid {
  export type Input = { key: string }
  export type Output = string
}
