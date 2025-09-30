<script lang="ts" setup>
import MenuButton from './MenuButton.vue'
import { state } from '@/scripts/gameState'
import { ref } from 'vue'

const showMenu = ref(state.showMenu)

const numberOfTokens = ref(27)

const player1Name = ref('Player 1')
const player2Name = ref('Player 2')
const player3Name = ref('Player 3')
const player4Name = ref('Player 4')

function startGame() {
  state.startNewGame(numberOfTokens.value, [
    player1Name.value,
    player2Name.value,
    player3Name.value,
    player4Name.value,
  ])
}
</script>

<template>
  <div class="menuContainer">
    <h1>Heroes of the Storm</h1>
    <h2>Memory Matching Game</h2>

    <h3>Number of players:</h3>

    <div class="radioContainer">
      <label>
        <input type="radio" name="numPlayers" value="1" v-model="state.numPlayers" checked />
        1
      </label>
      <label>
        <input type="radio" name="numPlayers" value="2" v-model="state.numPlayers" />
        2
      </label>
      <label>
        <input type="radio" name="numPlayers" value="3" v-model="state.numPlayers" />
        3
      </label>
      <label>
        <input type="radio" name="numPlayers" value="4" v-model="state.numPlayers" />
        4
      </label>
    </div>

    <!-- Player name inputs, shown only for selected number of players -->
    <!-- Bind player name inputs using v-model -->
    <div v-if="state.numPlayers >= 1" class="nameContainer">
      <h3>Player 1 Name:</h3>
      <input type="text" v-model="player1Name" />
    </div>
    <div v-if="state.numPlayers >= 2" class="nameContainer">
      <h3>Player 2 Name:</h3>
      <input type="text" v-model="player2Name" />
    </div>
    <div v-if="state.numPlayers >= 3" class="nameContainer">
      <h3>Player 3 Name:</h3>
      <input type="text" v-model="player3Name" />
    </div>
    <div v-if="state.numPlayers >= 4" class="nameContainer">
      <h3>Player 4 Name:</h3>
      <input type="text" v-model="player4Name" />
    </div>

    <h3>Number of Tokens:</h3>
    <select v-model="numberOfTokens">
      <option value="11">11 (Easy)</option>
      <option value="19">19 (Medium)</option>
      <option value="27">27 (Hard)</option>
    </select>

    <MenuButton text="Start Game" @click="() => startGame()" />
  </div>
</template>

<style scoped>
.menuContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  gap: 1rem;
}

h1 {
}

h2 {
}

h3 {
}
</style>
