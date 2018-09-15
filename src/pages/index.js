// @flow

import React from 'react'
import styled from 'react-emotion'
import {Headline} from '../components/headline'
import {MouseMapProvider, MouseMap} from '../components/context/mouse-map'
import {Canvas} from '../components/graphics/canvas'
import {MouseTracker} from '../components/functionality/mouse-tracker'
import {ClearMouseMap} from '../components/buttons/clear-map'

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
    <Headline invisible>freelance javascript developer</Headline>
  </Content>
)

const Home = () => (
  <MouseMapProvider>
    <MouseMap>
      {({addPoint, points, prevSessions, clearAll}) => (
        <MouseTracker addPoint={addPoint}>
          {({onMouseMove, onTouchMove}) => (
            <div onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
              <Canvas points={points} prevSessions={prevSessions} />
              {content}
              <ClearMouseMap clearAll={clearAll} />
            </div>
          )}
        </MouseTracker>
      )}
    </MouseMap>
  </MouseMapProvider>
)

export default Home
