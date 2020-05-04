import * as React from 'react'
import { useStaticInfo } from 'react-static'
import { css } from '@emotion/core'
import { linkIsActive } from '../../util/path'
import { highlightColor, textColor } from '../../css/colors'

const style = css`
  color: ${textColor};
`

const activeStyle = css`
  color: ${highlightColor};
`

const NavLink: React.FC<Require<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>> = props => {
  const isActive = linkIsActive({
    href: props.href,
    currentPath: useStaticInfo()?.path ?? window.location.pathname,
  })

  return <a {...props} css={[style, isActive && activeStyle]} />
}

export default NavLink
