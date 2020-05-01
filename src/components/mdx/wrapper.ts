import styled from '@emotion/styled'
import { phone, smallPhone } from '../../css/media'

const MDXWrapper = styled.main`
  padding: 5rem;
  margin: 0 auto;
  max-width: calc(70ch + 10rem);

  max-height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${phone}) {
    padding: 2rem;
  }

  @media (max-width: ${smallPhone}) {
    padding: 1rem;
  }

  /* NOTE: typography */
  line-height: 1.5;
  font-kerning: normal;
  letter-spacing: 0.02rem;

  p + p {
    margin-top: 1rem;
  }
`

export default MDXWrapper
