export const DEFAULT_HUE = 200

export const getHSLColor = (hue: number = DEFAULT_HUE): string =>
  `hsl(${hue}, 50%, 75%)`

const hueRegex = /\d{1,3}(?=\s*,)/

const getHSLHue = (color: string): number => {
  const results = hueRegex.exec(color)
  return results ? parseInt(results[0], 10) : DEFAULT_HUE
}

export class HSLRotation {
  maxHue = 300
  minHue = 180

  currentHue: number
  direction: 1 | -1 = 1

  constructor(start: number | string) {
    this.currentHue = typeof start === 'number' ? start : getHSLHue(start)
  }

  next() {
    const color = getHSLColor(this.currentHue)

    if (this.currentHue >= this.maxHue) {
      this.direction = -1
    } else if (this.currentHue <= this.minHue) {
      this.direction = 1
    }

    this.currentHue += this.direction
    return color
  }
}
