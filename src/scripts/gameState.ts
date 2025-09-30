import { reactive } from 'vue'

import { Token } from './classToken'
import { Player } from './classPlayer'
import { getTokens } from './tokenArray'

interface State {
  showMenu: boolean
  showGameEnd: boolean
  currentlyEvaluating: boolean

  numPlayers: number
  players: Player[]
  currentPlayerIndex: number
  getCurrentPlayer: Function
  winningPlayer: Player | undefined

  numberOfTurns: number

  gameTokens: Token[]
  matchedThisTurn: Token[]

  firstFlipped: Token | undefined
  secondFlipped: Token | undefined

  evaluateFlip: Function

  startNewGame: Function
  resetGame: Function
}

export const state = reactive<State>({
  showMenu: true,
  showGameEnd: false,
  currentlyEvaluating: false,

  numPlayers: 1,
  players: [],
  currentPlayerIndex: 0,

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex]
  },

  winningPlayer: undefined,

  numberOfTurns: 0,

  gameTokens: [],
  matchedThisTurn: [],

  firstFlipped: undefined,
  secondFlipped: undefined,

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
      return
    }

    // Second token does not match the first
    handleMiss()
  },

  startNewGame(numberOfTokens = 27, playerNames: string[] = []) {
    this.showMenu = false
    this.gameTokens = []
    this.gameTokens = getTokens(numberOfTokens)
    setNewPlayers(playerNames)
  },

  resetGame() {
    this.winningPlayer = undefined
    this.players.forEach((player) => player.resetTokens())
    this.currentPlayerIndex = 0
    this.numberOfTurns = 0
    this.matchedThisTurn = []

    resetFlippedTokens()
    const tokensLength = this.gameTokens.length
    this.gameTokens = []
    this.gameTokens = getTokens(tokensLength)

    this.showGameEnd = false
  },
})

function setNewPlayers(playerNames: string[]) {
  state.players = []
  for (let i = 0; i < state.numPlayers; i++) {
    const name = playerNames[i] ? playerNames[i] : `Player ${i + 1}`
    const player = new Player(name)
    state.players.push(player)
  }
  state.currentPlayerIndex = 0
}

function nextPlayerTurn() {
  const lastPlayerIndex = state.players.length - 1
  if (state.currentPlayerIndex === lastPlayerIndex) {
    state.currentPlayerIndex = 0
  } else {
    state.currentPlayerIndex++
  }
  resetFlippedTokens()
  flipAllTokens()
  state.numberOfTurns++
}

function handleMatch() {
  if (!(state.firstFlipped && state.secondFlipped)) return

  state.matchedThisTurn.push(state.firstFlipped, state.secondFlipped)

  if (hasGameBeenWon()) {
    addMatchesToPlayerScore()
    endGame()
    return
  }
  resetFlippedTokens()
  return
}

function handleMiss() {
  state.currentlyEvaluating = true
  setTimeout(() => {
    addMatchesToPlayerScore()
    nextPlayerTurn()
    state.currentlyEvaluating = false
  }, 1500)
}

function addMatchesToPlayerScore() {
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
  state.matchedThisTurn = []
}

function resetFlippedTokens() {
  state.firstFlipped = undefined
  state.secondFlipped = undefined
}

function flipAllTokens() {
  const length = state.gameTokens.length
  for (let i = 0; i < length; i++) {
    state.gameTokens[i].revealed = false
  }
}

function hasGameBeenWon(): boolean {
  let gameWon = true
  state.gameTokens.forEach((token) => {
    if (token.matched === false && !state.matchedThisTurn.includes(token)) {
      gameWon = false
    }
    // All tokens have been matched
  })
  console.log(`Checking if game is won: ${gameWon}`)
  return gameWon
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
