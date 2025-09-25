<script setup lang="ts">
import { ref } from 'vue'
import HOTSIcon from '@/assets/photos/HOTS Icon.png'
const props = defineProps({ name: String, imgURL: String })

let revealed = ref(false)

function toggleReveal() {
  revealed.value = !revealed.value
  console.log(`Revealing ${props.name}`)
}
</script>

<template>
  <div class="tileContainer">
    <img :src="revealed ? imgURL : HOTSIcon" @click="toggleReveal" />
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
