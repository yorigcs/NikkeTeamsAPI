export interface Encrypter {
  encrypt: (params: Encrypter.Params) => Promise<string>
}

export namespace Encrypter {
  export type Params = {
    plainText: string
  }
}
