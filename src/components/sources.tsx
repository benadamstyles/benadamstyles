import * as React from 'react'
import { Seq } from 'immutable'
import pkg from '../../package.json'

const center = {
  textAlign: 'center',
} as const

const html = {
  __html: Seq(pkg.dependencies)
    .keySeq()
    .filterNot(dep => dep.includes('plugin'))
    .map(dep => `<a href="https://www.npmjs.com/package/${dep}">${dep}</a>`)
    .reduce((out: string, dep, i, seq) =>
      i === seq.count() - 1 ? `${out} & ${dep}` : `${out}, ${dep}`
    ),
}

export const sources = (
  <div>
    <p css={center}>Brought to you with</p>
    <p css={center} dangerouslySetInnerHTML={html} />
    <p css={center}>from Leeds, Yorkshire, UK</p>
  </div>
)
