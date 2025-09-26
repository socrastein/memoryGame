<script setup lang="ts">
import { ref, computed } from 'vue'
import { state } from '@/scripts/gameState'

import Tile from './Tile.vue'

const gameTokens = ref(state.gameTokens)
const currentPlayer = computed(() => state.players[state.currentPlayerIndex])
</script>

<template>
  <div class="mainContainer">
    <div class="gameHeader">
      <h1
        v-for="player in state.players"
        :key="player.name"
        class="playerName"
        :class="{ highlight: player === currentPlayer }"
      >
        {{ player.name }} | {{ player.tokens.length }}
      </h1>
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

.playerName {
}

.highlight {
  border: solid 1px red;
}

.tokensContainer {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>
