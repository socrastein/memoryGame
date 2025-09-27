import { createApp } from 'vue'
import App from './App.vue'

import { state } from './scripts/gameState'

import '@/style.css'

state.startNewGame();

createApp(App).mount('#app')
