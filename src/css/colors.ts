import { setLightness, setSaturation, transparentize } from 'polished'

export const linkColor = '#108db8'
export const textColor = setLightness(0.1, linkColor)
export const heavyTextColor = setSaturation(0.7, textColor)
export const backgroundColor = '#f0f3f4'
export const highlightColor = 'rebeccapurple'
export const hintColor = transparentize(0.98, highlightColor)
