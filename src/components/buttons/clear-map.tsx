import * as React from 'react'
import styled from '@emotion/styled'

const Button = styled.button`
  position: absolute;
  top: 1rem;
  left: auto;
  right: 1rem;
  border: none;
  background: transparent;
  font-size: 1.8em;

  &:hover {
    opacity: 0.3;
  }
`

interface Props {
  readonly clearAll: () => void
}

export const ClearMouseMap: React.FC<Props> = ({ clearAll }) => (
  <Button type="button" onClick={clearAll}>
    clear
  </Button>
)
