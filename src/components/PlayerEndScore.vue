<script setup lang="ts">
import { ref } from 'vue'
import { Player } from '@/scripts/classPlayer'
import { state } from '@/scripts/gameState'

const props = defineProps({
  player: Player,
})

const winningPlayer = ref(props.player === state.winningPlayer)
</script>

<template>
  <div v-if="player" class="playerScoreContainer">
    <h1 v-if="winningPlayer" class="winner">{{ player.name.toUpperCase() }} WINS!</h1>
    <h1 v-else class="loser">{{ player.name }} sucks...</h1>
    <img class="smallToken" v-for="token in player.tokens" :src="token.img" />
  </div>
</template>

<style scoped>
.playerScoreContainer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 80%;
  color: whitesmoke;
  gap: 0.5rem;
}

h1 {
  width: 100%;
}

.winner {
}

.loser {
  font-style: italic;
}

.smallToken {
  height: 3rem;
  width: 3rem;

  border-radius: 50%;
}
</style>
