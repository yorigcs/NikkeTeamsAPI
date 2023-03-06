export interface UUID {
  generate: (input: UUID.Input) => Promise<UUID.Output>
}

export namespace UUID {
  export type Input = { key?: string }
  export type Output = string
}
