// @flow

import React from 'react'
import styled from 'react-emotion'
import {Headline} from '../components/headline'
import {MouseMapProvider, MouseMap} from '../components/context/mouse-map'
import {Canvas} from '../components/graphics/canvas'
import {MouseTracker} from '../components/functionality/mouse-tracker'

const Content = styled.div`
  position: absolute;
  left: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`

const content = (
  <Content>
    <Headline>Ben Styles</Headline>
  </Content>
)

const Home = () => (
  <MouseMapProvider>
    <MouseMap>
      {({addPoint, currentColor, points, prevSessions}) => (
        <MouseTracker addPoint={addPoint}>
          {onMouseMove => (
            <div onMouseMove={onMouseMove}>
              <Canvas
                points={points}
                prevSessions={prevSessions}
                currentColor={currentColor}
              />
              {content}
            </div>
          )}
        </MouseTracker>
      )}
    </MouseMap>
  </MouseMapProvider>
)

export default Home
