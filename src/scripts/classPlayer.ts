import { state } from './gameState'

interface Token {
  name: string
}

export class Player {
  name: string
  tokens: Token[]

  constructor(name: string) {
    this.name = name
    this.tokens = []
  }

  takeTokens(tokenName: string) {
    const tokenIndex = state.gameTokens.findIndex((token: Token) => {
      return token.name === tokenName
    })

    const token = state.gameTokens[tokenIndex]
    this.tokens.push(token)
  }
}
