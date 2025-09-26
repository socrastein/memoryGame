import { state } from "./gameState"

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
    const firstTokenIndex = state.gameTokens.findIndex((token: Token) => {
      token.name == tokenName
    })

    const firstToken = state.gameTokens.splice(firstTokenIndex, 1)
    this.tokens.push(firstToken)

    const secondTokenIndex = state.gameTokens.findIndex((token: Token) => {
      token.name == tokenName
    })

    state.gameTokens.splice(secondTokenIndex)
  }
}
