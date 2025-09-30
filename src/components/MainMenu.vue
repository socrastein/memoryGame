<script lang="ts" setup>
import MenuButton from './MenuButton.vue'
import { state } from '@/scripts/gameState'
import { ref } from 'vue'

import HOTS from "@/assets/photos/HOTS Icon.png"
import murky from "@/assets/portraits/Murky.png"
import mei from "@/assets/portraits/Mei.png"

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
    <div class="tokensContainer">
      <img class="token" :src="HOTS"></img>

      <img class="token" :src="murky"></img>
      <img class="token" :src="HOTS"></img>
      <img class="token" :src="mei"></img>
      <img class="token" :src="HOTS"></img>

    </div>
    <h2>Memory Matching Game</h2>
    <hr></hr>
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
    <div class="nameInputsContainer">
      <div v-if="state.numPlayers >= 1" class="nameContainer">
        <h4>Player 1:</h4>
        <input type="text" v-model="player1Name" />
      </div>
      <div v-if="state.numPlayers >= 2" class="nameContainer">
        <h4>Player 2:</h4>
        <input type="text" v-model="player2Name" />
      </div>
      <div v-if="state.numPlayers >= 3" class="nameContainer">
        <h4>Player 3:</h4>
        <input type="text" v-model="player3Name" />
      </div>
      <div v-if="state.numPlayers >= 4" class="nameContainer">
        <h4>Player 4:</h4>
        <input type="text" v-model="player4Name" />
      </div>
    </div>

    <hr></hr>

    <h3>Pairs of Tokens:</h3>
    <select v-model="numberOfTokens">
      <option value="11">11 (Easy)</option>
      <option value="19">19 (Medium)</option>
      <option value="27">27 (Hard)</option>
    </select>

    <hr></hr>

    <MenuButton text="Start Game" @click="() => startGame()" />
  </div>
</template>

<style scoped>
.menuContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  width: 90vw;
  height: 90vh;

  background-image: linear-gradient(#111133, #252531);
  padding: 2rem;
  border: solid 2px white;
  border-radius: 1rem;
  box-shadow:
    0px 6px 16px 2px whitesmoke,
    0px 8px 8px 2px cyan;
}

h1, h2, h3, h4 {
  margin: 0;
}

h1 {
  font-size: 3rem;
}

.tokensContainer {
  display: flex;
  gap: 2rem;
}

.token {
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
}

h2 {
  font-size: 2rem;
}

hr {
  width: 25%;
  color: cyan;
  box-shadow: 0px 0px 8px 0px white;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  
}

.nameInputsContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.nameContainer {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

input[type="text"] {
  width: 12rem;
  padding: .25rem;
  font-size: 1rem;
  text-align: center;

  border-radius: .5rem;
}

select { 
  width: 12rem;
  padding: .25rem;
  font-size: 1rem;
  text-align: center;

  border-radius: .5rem;
}
</style>
