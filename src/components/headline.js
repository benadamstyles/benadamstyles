// @flow

import styled, {css} from 'react-emotion'

export const Headline = styled.h1`
  text-align: center;
  ${props =>
    props.invisible &&
    css`
      color: white;
    `};
`
