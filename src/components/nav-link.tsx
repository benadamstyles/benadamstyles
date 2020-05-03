import * as React from 'react'
import { useStaticInfo } from 'react-static'
import { css } from '@emotion/core'
import { linkIsActive } from '../util/path'
import { highlightColor } from '../css/colors'

const activeStyle = css`
  color: ${highlightColor};
`

const NavLink: React.FC<Require<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>> = props => {
  const currentPath = useStaticInfo()?.path

  const isActive = linkIsActive({
    href: props.href,
    currentPath,
  })

  return <a {...props} css={isActive && activeStyle} />
}

export default NavLink
