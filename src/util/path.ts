import { nodeSafe } from './node-safe'

const trimSlashes = (pathname: string) =>
  pathname.trim().replace(/^\//, '').replace(/\/$/, '')

export const linkIsActive = nodeSafe(false, (href: string) => {
  const currentPath = trimSlashes(window.location.pathname)
  const linkPath = trimSlashes(new URL(href, window.location.origin).pathname)
  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`)
})
