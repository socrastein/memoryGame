import { createApp } from 'vue'
import App from './App.vue'
import { state } from './scripts/gameState'

state.startNewGame();

createApp(App).mount('#app')
