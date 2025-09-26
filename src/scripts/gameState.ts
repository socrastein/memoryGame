import { Player } from './classPlayer'
import { getTokens } from './tokenArray'

export const state = {
  players: [] as Player[],
  currentPlayerIndex: 0,

  gameTokens: [] as any,

  firstFlippedToken: null,
  secondFlippedToken: null,

  startNewGame() {
    setNewPlayers()
    this.gameTokens = getTokens()
  },

  nextPlayerTurn() {
    const lastPlayerIndex = this.players.length - 1
    if (this.currentPlayerIndex === lastPlayerIndex) {
      this.currentPlayerIndex = 0
    } else {
      this.currentPlayerIndex++
    }
    flipAllTokens()
  },
}

function setNewPlayers() {
  const player1 = new Player('Player 1')
  const player2 = new Player('Player 2')

  state.players = []

  state.players.push(player1)
  state.players.push(player2)

  state.currentPlayerIndex = 0
}

function flipAllTokens() {
  const length = state.gameTokens.length
  for (let i = 0; i < length; i++) {
    state.gameTokens[i].revealed = false
  }
}
