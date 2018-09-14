// @flow

import styled, {css} from 'react-emotion'
import {backgroundColor} from '../constants/styles/colors'

export const Headline = styled.h1`
  text-align: center;
  ${props =>
    props.invisible &&
    css`
      color: ${backgroundColor};
    `};
`
