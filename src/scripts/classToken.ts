import HOTSIcon from '@/assets/photos/HOTS Icon.png'

export class Token {
  name: string
  img: string

  revealed = false
  matched = false

  coverIMG = HOTSIcon

  constructor(name: string, img: string) {
    this.name = name
    this.img = img
  }
}
