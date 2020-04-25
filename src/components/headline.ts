import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { backgroundColor } from '../constants/css-variables.generated'

interface Props {
  readonly invisible?: boolean
}

export const Headline = styled.h1<Props>`
  text-align: center;
  ${props =>
    props.invisible &&
    css`
      color: ${backgroundColor};
    `};
`