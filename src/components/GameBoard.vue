<script setup lang="ts">
import { ref } from 'vue'
import { state } from '@/scripts/gameState'
import Tile from './Tile.vue'

const gameTokens = ref(state.gameTokens)
const players = ref(state.players)
const currentPlayer = ref(state.players[state.currentPlayerIndex])
</script>

<template>
  <div class="mainContainer">
    <div class="gameHeader">
      <h1 v-for="player in players">{{ player.name }}</h1>
    </div>
    <div class="tokensContainer">

      <Tile v-for="token in gameTokens" :token="token" />
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
}

.gameHeader {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.tokensContainer {
  display: flex;
  gap: 2rem;
}
</style>
