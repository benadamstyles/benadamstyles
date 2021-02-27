import * as React from 'react'
import styled from '@emotion/styled'

import { Headline } from '../components/headline'
import {
  MouseFlowProvider,
  useMouseFlow,
} from '../components/context/mouse-flow'
import { Canvas } from '../components/graphics/canvas'
import { ClearMouseFlow } from '../components/buttons/clear-mouse-flow'
import { useScreenSize } from '../util/hooks'
import { backgroundColor } from '../css/Colors.gen'
import { phone, smallPhone } from '../css/Breakpoints.gen'
import * as CSSOverrides from '../css/overrides'
import { homeFooter } from '../components/footers/footer'

const Container = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
})

const Content = styled.div({
  position: 'absolute',
  left: 0,
  padding: 0,
  textAlign: 'center',
  width: '100%',
  top: '50%',
  transform: 'translateY(-50%)',
})

const LogoLink = styled.a`
  :nth-of-type(n + 2) {
    margin-left: 12px;
  }
`

const Logo = styled.img`
  filter: drop-shadow(2px 2px ${backgroundColor});
  width: 64px;
  height: 64px;

  @media (max-width: ${phone}) {
    width: 48px;
    height: 48px;
  }

  @media (max-width: ${smallPhone}) {
    width: 32px;
    height: 32px;
  }
`

const links = {
  twitter: 'https://twitter.com/benadamstyles',
  github: 'https://github.com/benadamstyles',
  appstore: 'https://itunes.apple.com/us/developer/benjamin-styles/id856831184',
  medium: 'https://medium.com/@benadamstyles',
  stackoverflow: 'https://stackoverflow.com/users/3098651/benadamstyles',
  flickr: 'https://www.flickr.com/photos/benstyles/',
}

const content = (
  <Content>
    <Headline>
      {Object.entries(links).map(([image, url]) => (
        <LogoLink
          key={image}
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          <Logo src={`images/logos/${image}.png`} width={64} height={64} />
        </LogoLink>
      ))}
    </Headline>
    <Headline>Ben Styles</Headline>
    <Headline invisible>freelance javascript developer</Headline>
  </Content>
)

const Home: React.FC<{ dimensions: { width: number; height: number } }> = ({
  dimensions,
}) => {
  const { addPoint, points, prevSessions, clearAll } = useMouseFlow()

  const onMouseMove: React.MouseEventHandler = e =>
    addPoint(e.clientX, e.clientY)

  const onTouchMove: React.TouchEventHandler = e =>
    e.changedTouches &&
    Array.from(e.changedTouches).forEach(touch =>
      addPoint(touch.clientX, touch.clientY)
    )

  return (
    <Container>
      <div onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
        <Canvas points={points} prevSessions={prevSessions} {...dimensions} />

        {content}

        <ClearMouseFlow clearAll={clearAll} />
      </div>

      {homeFooter}
    </Container>
  )
}

const HomeWrapper = () => {
  const dimensions = useScreenSize()

  return (
    <MouseFlowProvider screenWidth={dimensions.width}>
      <CSSOverrides.NavFixed />
      <Home dimensions={dimensions} />
    </MouseFlowProvider>
  )
}

export default HomeWrapper
