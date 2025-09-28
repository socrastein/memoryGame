<script setup lang="ts">
import { ref, computed } from 'vue'
import { state } from '@/scripts/gameState'

import Tile from './Tile.vue'
import PlayerEndScore from './PlayerEndScore.vue'

const gameTokens = computed(() => state.gameTokens)
const currentPlayer = computed(() => state.players[state.currentPlayerIndex])
const players = computed(() => state.players)
</script>

<template>
  <div class="mainContainer">
    <div class="gameHeader">
      <div
        class="playerContainer"
        v-for="player in state.players"
        :key="player.name"
        :class="{ highlight: player === currentPlayer }"
      >
        <h1>{{ player.name }}</h1>
        <h1>{{ player.tokens.length }}</h1>
      </div>
    </div>
    <div v-if="!state.showGameEnd" class="tokensContainer">
      <Tile v-for="token in gameTokens" :token="token" />
    </div>
    <div v-else class="endScreen">
      <PlayerEndScore v-for="player in players" :player="player" />

      <button class="newGameButton" @click="state.startNewGame()">New Game</button>
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  gap: 1rem;
  padding: 1rem;

  min-height: 100vh;
  width: 100dvw;

  background-color: #1a1a1a;
}

.gameHeader {
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 0 5%;
}

.playerContainer {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  width: 40%;

  border: solid 2px whitesmoke;
  border-radius: 2rem;

  color: #fafafa;
}

.playerName {
  color: #fafafa;
}

.highlight {
  border: solid 3px cyan;
  box-shadow:
    0px 4px 1rem 4px whitesmoke,
    0px 2px 2px 2px cyan;
}

.tokensContainer {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1rem;

  padding: 1rem;
  width: 100%;

  border: solid 1px whitesmoke;
  border-radius: 2rem;
}

.endScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  gap: 1rem;

  height: 100%;
  width: 100%;
}

.newGameButton {
  height: 3rem;
  width: 8rem;
  font-size: 1.2rem;
}
</style>
