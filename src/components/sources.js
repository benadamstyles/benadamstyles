// @flow

import React from 'react'
import {Seq} from 'immutable'
import {css} from 'emotion'
import pkg from '../../package.json'

const center = css`
  text-align: center;
`

const getHtml = () => ({
  __html: Seq(pkg.dependencies)
    .keySeq()
    .filterNot(dep => dep.includes('plugin'))
    .map(dep => `<a href="https://www.npmjs.com/package/${dep}">${dep}</a>`)
    .reduce(
      (out, dep, i, seq) =>
        i === seq.count() - 1 ? `${out} & ${dep}` : `${out}, ${dep}`
    ),
})

export const Sources = () => (
  <div>
    <p className={center}>Brought to you with</p>
    <p className={center} dangerouslySetInnerHTML={getHtml()} />
    <p className={center}>from Leeds, Yorkshire, UK</p>
  </div>
)
