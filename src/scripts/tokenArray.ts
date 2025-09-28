import { Token } from './classToken'

const images = import.meta.glob('@/assets/portraits/*.png', { eager: true })

function getTokenArray(): Token[] {
  const tokens: Token[] = []

  for (const path in images) {
    // @ts-ignore
    const url = images[path].default || images[path]

    // Extract name from filename
    const parts = path.split('/')
    const filename = parts[parts.length - 1]
    const name = filename.split('.')[0]

    tokens.push(new Token(name, url))
  }

  return tokens
}

export function getTokens(amount?: number) {
  let tokens = getTokenArray()
  let copies = getTokenArray()

  if (amount) {
    tokens = getTokenArray().slice(0, amount)
    copies = getTokenArray().slice(0, amount)
  }

  const combined = tokens.concat(copies)
  shuffle(combined)

  return combined
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
