import { reactive } from 'vue'

import { Token } from './classToken'

// Images for all of the tokens
import jaina from '@/assets/portraits/Jaina.png'
import garrosh from '@/assets/portraits/Garrosh.png'
import chen from '@/assets/portraits/Chen.png'
import lili from '@/assets/portraits/LiLi.png'
import artanis from '@/assets/portraits/Artanis.png'

function getTokenArray(amount?: number) {
  const tokenArray = [
    new Token('Jaina', jaina),
    new Token('Garrosh', garrosh),
    new Token('Chen', chen),
    new Token('Li Li', lili),
    new Token('Artanis', artanis),
  ]

  if (amount) {
    return tokenArray.slice(0, amount)
  } else {
    return tokenArray
  }
}

export function getTokens(amount?: number) {
  const tokens = getTokenArray(amount)
  const copies = getTokenArray(amount)
  const combined = tokens.concat(copies)

  shuffle(combined)
  return reactive(combined)
}

function shuffle(array: any[]) {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
}
