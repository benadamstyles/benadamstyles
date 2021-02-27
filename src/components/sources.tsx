import * as React from 'react'
import { Seq } from 'immutable'

const center = {
  textAlign: 'center',
} as const

const dependencies = {
  ReScript: 'https://rescript-lang.org/',
  React: 'https://reactjs.org/',
  'React Static': 'https://github.com/react-static/react-static',
  Emotion: 'https://emotion.sh/',
  Konva: 'https://konvajs.org',
  'React Spring': 'https://www.react-spring.io',
} as const

const html = {
  __html: Seq(dependencies)
    .map((url, name) => `<a href="${url}">${name}</a>`)
    .valueSeq()
    .reduce((out: string, link, i, seq) =>
      i === seq.count() - 1 ? `${out} & ${link}` : `${out}, ${link}`
    ),
}

export const sources = (
  <div>
    <p css={center}>Brought to you with</p>
    <p css={center} dangerouslySetInnerHTML={html} />
    <p css={center}>from Barcelona, España</p>
  </div>
)
