import * as React from 'react'
import styled from '@emotion/styled'
import { Headline } from '../components/headline'
import { MouseMapProvider, MouseMap } from '../components/context/mouse-map'
import { Canvas } from '../components/graphics/canvas'
import { MouseTracker } from '../components/functionality/mouse-tracker'
import { ClearMouseMap } from '../components/buttons/clear-map'
import { ScreenSize } from '../components/functionality/screen-size'
import {
  backgroundColor,
  phone,
  smallPhone,
} from '../constants/css-variables.generated'

const Content = styled.div`
  position: absolute;
  left: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`

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

const links = [
  ['twitter', 'https://twitter.com/benadamstyles'],
  ['github', 'https://github.com/benadamstyles'],
  [
    'appstore',
    'https://itunes.apple.com/us/developer/benjamin-styles/id856831184',
  ],
  ['medium', 'https://medium.com/@benadamstyles'],
  ['stackoverflow', 'https://stackoverflow.com/users/3098651/benadamstyles'],
  ['flickr', 'https://www.flickr.com/photos/benstyles/'],
]

const content = (
  <Content>
    <Headline>
      {links.map(([image, url]) => (
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

const Home = () => (
  <ScreenSize>
    {dimensions => (
      <MouseMapProvider screenWidth={dimensions.width}>
        <MouseMap>
          {({ addPoint, points, prevSessions, clearAll }) => (
            <MouseTracker addPoint={addPoint}>
              {handlers => (
                <div {...handlers}>
                  <Canvas
                    points={points}
                    prevSessions={prevSessions}
                    {...dimensions}
                  />
                  {content}
                  <ClearMouseMap clearAll={clearAll} />
                </div>
              )}
            </MouseTracker>
          )}
        </MouseMap>
      </MouseMapProvider>
    )}
  </ScreenSize>
)

export default Home
