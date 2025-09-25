<script setup lang="ts">
import { heroArray } from '@/scripts/heroArray.ts'
import Tile from './Tile.vue'
</script>

<template>
  <div class="mainContainer">
    <Tile v-for="hero in heroArray" :imgURL="hero.img" :name="hero.name" />
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
}
</style>
