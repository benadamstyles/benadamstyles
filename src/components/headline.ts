import styled from '@emotion/styled'

import { backgroundColor } from '../css/Colors.gen'

const invisibleStyle = {
  color: backgroundColor,
}

interface Props {
  readonly invisible?: boolean
}

export const Headline = styled.h1<Props>(
  { textAlign: 'center' },
  props => props.invisible && invisibleStyle
)
