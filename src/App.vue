<script setup lang="ts">
import { ref, computed } from 'vue'

import GameBoard from './components/GameBoard.vue'
import MainMenu from './components/MainMenu.vue'

import { state } from './scripts/gameState'

const showMenu = computed(() => state.showMenu)
</script>

<template>
  <MainMenu v-if="showMenu" />
  <GameBoard v-else />
</template>

<style scoped></style>
