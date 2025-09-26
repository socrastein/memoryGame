import { reactive } from 'vue'

import HOTSIcon from '@/assets/photos/HOTS Icon.png'

import jainaIMG from '@/assets/portraits/Jaina.png'
import garroshIMG from '@/assets/portraits/Garrosh.png'

class Token {
  name: string
  img: string

  revealed = false
  coverIMG = HOTSIcon

  constructor(name: string, img: string) {
    this.name = name
    this.img = img
  }
}

const tokenArray = [new Token('Jaina', jainaIMG), new Token('Garrosh', garroshIMG)]

export function getTokens(amount?: number) {
  let tokens: Token[]
  if (amount) {
    tokens = tokenArray.slice(0, amount)
  } else {
    tokens = tokenArray.slice()
  }

  shuffle(tokens)
  
  return reactive(tokens)
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
