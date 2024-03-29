import styled from '@emotion/styled'

import { phone, smallPhone } from '../../css/Breakpoints.gen'
import { hintColor } from '../../css/Colors.gen'

export const Main = styled.main`
  padding: 5rem;
  margin: 0 auto;
  max-width: calc(70ch + 10rem);

  @media (max-width: ${phone}) {
    padding: 3rem 2rem;
  }

  @media (max-width: ${smallPhone}) {
    padding: 3rem 1rem;
  }

  /* NOTE: typography */
  line-height: 1.5;
  font-kerning: normal;
  letter-spacing: 0.03rem;

  p + p {
    margin-top: 1rem;
  }

  nav {
    background-color: ${hintColor};
    padding: 0.2rem;
    margin: 2rem 0;

    ol {
      /* Fallback for Safari which doesn't accept strings */
      list-style-type: circle;
      list-style-type: '–  ';
    }
  }
`
