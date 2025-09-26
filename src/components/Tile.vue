<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({ token: Object })

function toggleReveal() {
  if (!props.token) return
  props.token.revealed = !props.token.revealed
  console.log(`Revealing ${props.token.name}`)
}
</script>

<template>
  <div class="tileContainer">
    <img :src="token.revealed ? token.img : token.coverIMG" @click="toggleReveal" />
  </div>
</template>

<style scoped>
.tileContainer {
  display: flex;
  overflow: hidden;

  height: 4rem;
  width: 4rem;

  border: solid 5px black;
  border-radius: 50%;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
