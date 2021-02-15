import styled from '@emotion/styled'
import { phone, smallPhone } from '../../css/Breakpoints.gen'

const PostWrapper = styled.main`
  padding: 5rem;
  margin: 0 auto;
  max-width: calc(70ch + 10rem);

  @media (max-width: ${phone}) {
    padding: 2rem;
  }

  @media (max-width: ${smallPhone}) {
    padding: 2rem 1rem;
  }

  /* NOTE: typography */
  line-height: 1.5;
  font-kerning: normal;
  letter-spacing: 0.03rem;

  p + p {
    margin-top: 1rem;
  }
`

export default PostWrapper
