<script setup lang="ts">
import { state } from '@/scripts/gameState'

const props = defineProps({ token: Object })

function handleClick() {
  if (!props.token) return
  state.evaluateFlip(props.token)
}
</script>

<template>
  <div v-if="token" class="tileContainer">
    <div v-if="token.matched" class="tilePlaceholder"></div>
    <img v-else :src="token.revealed ? token.img : token.coverIMG" @click="handleClick" />
  </div>
</template>

<style scoped>
.tileContainer {
  display: flex;
  overflow: auto;

  height: 6rem;
  aspect-ratio: 1;

  border: solid 5px black;
  border-radius: 50%;

  cursor: pointer;
}

.tilePlaceholder {
  pointer-events: none;
  background-color: transparent;

  cursor: default;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
