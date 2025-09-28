import { reactive } from 'vue'

import { Token } from './classToken'
import { Player } from './classPlayer'
import { getTokens } from './tokenArray'

interface State {
  showMenu: boolean
  showGameEnd: boolean
  currentlyEvaluating: boolean

  players: Player[]
  currentPlayerIndex: number
  getCurrentPlayer: Function
  winningPlayer: Player | undefined

  gameTokens: Token[]
  matchedThisTurn: Token[]

  firstFlipped: Token | undefined
  secondFlipped: Token | undefined

  startNewGame: Function
  evaluateFlip: Function
}

export const state = reactive<State>({
  showMenu: true,
  showGameEnd: true,
  currentlyEvaluating: false,

  players: [],
  currentPlayerIndex: 0,

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex]
  },

  winningPlayer: undefined,

  gameTokens: [],
  matchedThisTurn: [],

  firstFlipped: undefined,
  secondFlipped: undefined,

  startNewGame(numberOfTokens = 27) {
    this.gameTokens = getTokens(numberOfTokens)
    resetVariables()
    setNewPlayers()
  },

  evaluateFlip(token: Token) {
    // Don't allow more clicking between timeouts
    if (this.currentlyEvaluating) return

    // Player has clicked the first token
    if (this.firstFlipped === undefined) {
      this.firstFlipped = token
      token.revealed = true
      return
    }

    // Player clicks same token again
    if (this.firstFlipped === token) {
      return
    }

    // Player has clicked a second token
    this.secondFlipped = token
    token.revealed = true

    // Second token matches the first
    if (this.firstFlipped.name === this.secondFlipped.name) {
      handleMatch()
    }

    // Second token does not match the first
    handleMiss()
  },
})

function setNewPlayers(name1 = 'Player 1', name2 = 'Player 2') {
  const player1 = new Player(name1)
  const player2 = new Player(name2)

  //TOKENS FOR TESTING
  player1.tokens = [...state.gameTokens.slice(0, 10)]
  player2.tokens = [...state.gameTokens.slice(10)]
  state.winningPlayer = player2

  state.players = [player1, player2]
  state.currentPlayerIndex = 0
}

function nextPlayerTurn() {
  const lastPlayerIndex = state.players.length - 1
  if (state.currentPlayerIndex === lastPlayerIndex) {
    state.currentPlayerIndex = 0
  } else {
    state.currentPlayerIndex++
  }
  console.log(`${state.players[state.currentPlayerIndex].name}'s turn`)
  resetVariables()
  flipAllTokens()
}

function handleMatch() {
  if (!(state.firstFlipped && state.secondFlipped)) return

  state.matchedThisTurn.push(state.firstFlipped, state.secondFlipped)
  if (hasGameBeenWon()) {
    endGame()
    return
  }
  resetVariables()
  return
}

function handleMiss() {
  state.currentlyEvaluating = true
  setTimeout(() => {
    const player = state.getCurrentPlayer()
    const tokensTaken: String[] = []

    state.matchedThisTurn.forEach((token) => {
      token.matched = true
      if (tokensTaken.includes(token.name)) {
        return
      }
      tokensTaken.push(token.name)
      player.takeTokens(token.name)
    })
    nextPlayerTurn()
    state.currentlyEvaluating = false
  }, 1500)
}

function resetVariables() {
  state.firstFlipped = undefined
  state.secondFlipped = undefined
  state.showMenu = false
  state.showGameEnd = false
  state.winningPlayer = undefined
}

function flipAllTokens() {
  const length = state.gameTokens.length
  for (let i = 0; i < length; i++) {
    state.gameTokens[i].revealed = false
  }
}

function hasGameBeenWon(): boolean {
  state.gameTokens.forEach((token) => {
    if ((token.matched = false)) {
      return false
    }
    // All tokens have been matched
  })
  return true
}

function endGame() {
  state.showGameEnd = true

  let maxScore = 0
  state.players.forEach((player) => {
    if (player.tokens.length > maxScore) {
      maxScore = player.tokens.length
      state.winningPlayer = player
    }
  })
}
