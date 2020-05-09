import * as React from 'react'
import { useStaticInfo } from 'react-static'
import { linkIsActive } from '../../util/path'
import { highlightColor, textColor } from '../../css/colors'

const style = {
  color: textColor,
}

const activeStyle = {
  color: highlightColor,
}

const NavLink: React.FC<Require<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>> = props => {
  const isActive = linkIsActive({
    href: props.href,
    currentPath: useStaticInfo()?.path ?? window.location.pathname,
  })

  return (
    <a {...props} css={[style, isActive && activeStyle]}>
      {props.children}
    </a>
  )
}

export default NavLink
