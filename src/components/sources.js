// @flow

import React from 'react'
import {Seq} from 'immutable'
import {css} from 'emotion'
import pkg from '../../package.json'

const center = css`
  text-align: center;
`

export const Sources = () => (
  <div>
    <p className={center}>Brought to you with</p>
    <p className={center}>
      {Seq(pkg.dependencies)
        .keySeq()
        .filterNot(k => k.includes('plugin'))
        .reduce(
          (out, k, i, seq) =>
            i === seq.count() - 1 ? `${out} & ${k}` : `${out}, ${k}`
        )}
    </p>
    <p className={center}>from Leeds, Yorkshire, UK</p>
  </div>
)
