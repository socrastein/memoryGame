import { reactive } from 'vue'

import { Token } from './classToken'
import { Player } from './classPlayer'
import { getTokens } from './tokenArray'

interface State {
  players: Player[]
  currentPlayerIndex: number

  gameTokens: Token[]
  matchedThisTurn: Token[]

  firstFlipped: Token | undefined
  secondFlipped: Token | undefined

  currentlyEvaluating: boolean

  startNewGame: Function
  nextPlayerTurn: Function
  evaluateFlip: Function

  logTokens: Function
}

export const state = reactive<State>({
  players: [],
  currentPlayerIndex: 0,

  gameTokens: [],
  matchedThisTurn: [],

  firstFlipped: undefined,
  secondFlipped: undefined,

  currentlyEvaluating: false,

  startNewGame() {
    setNewPlayers()
    resetFlipped()
    this.gameTokens = getTokens()
  },

  nextPlayerTurn() {
    const lastPlayerIndex = this.players.length - 1
    if (this.currentPlayerIndex === lastPlayerIndex) {
      this.currentPlayerIndex = 0
    } else {
      this.currentPlayerIndex++
    }
    console.log(`${this.players[this.currentPlayerIndex].name}'s turn`)
    resetFlipped()
    flipAllTokens()
  },

  evaluateFlip(token: Token) {
    // Don't allow more clicking between timeouts
    if (this.currentlyEvaluating) return

    if (this.firstFlipped === undefined) {
      this.firstFlipped = token
      token.revealed = true
      return
    }

    // Player clicks same token again
    if (this.firstFlipped === token) {
      return
    }

    this.secondFlipped = token
    token.revealed = true

    // Player clicks matching token
    if (this.firstFlipped.name === this.secondFlipped.name) {
      this.matchedThisTurn.push(this.firstFlipped, this.secondFlipped)
      resetFlipped()
      return
    }

    // Player clicks non-matching token
    this.currentlyEvaluating = true
    setTimeout(() => {
      this.nextPlayerTurn()
      this.currentlyEvaluating = false
    }, 1000)
  },

  logTokens() {
    const length = this.gameTokens.length
    console.log(`Logging ${length} state.gameTokens: `)

    for (let i = 0; i < length; i++) {
      console.log(this.gameTokens[i].name)
    }
  },
})

function setNewPlayers(name1 = 'Player 1', name2 = 'Player 2') {
  const player1 = new Player(name1)
  const player2 = new Player(name2)

  state.players = [player1, player2]
  state.currentPlayerIndex = 0
}

function resetFlipped() {
  state.firstFlipped = undefined
  state.secondFlipped = undefined
}

function flipAllTokens() {
  const length = state.gameTokens.length
  for (let i = 0; i < length; i++) {
    state.gameTokens[i].revealed = false
  }
}
