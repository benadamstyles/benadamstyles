import { nodeSafe } from './node-safe'

const trimSlashes = (pathname: string) =>
  pathname.trim().replace(/^\//, '').replace(/\/$/, '')

interface LinkParams {
  href: string
  currentPath?: string
}

const getLocationPropertyInBrowser = <Key extends keyof Location>(key: Key) =>
  nodeSafe<Location[Key] | undefined>(undefined, () => window.location[key])()

// NOTE: In a server-side build, I think the hrefs get prefixed with the
// basepath *after* React runs. Therefore, the hrefs will only start with 'http'
// in the browser, so it's safe to call getLocationPropertyInBrowser().
const removeBasepath = (href: string) =>
  href.startsWith('http')
    ? new URL(href, getLocationPropertyInBrowser('origin')).pathname
    : href

/**
 * On the server, you must pass in a truthy `currentPath`. On the client,
 * `currentPath` is read from the current Location.pathname
 */
export const linkIsActive = ({
  href,
  currentPath = getLocationPropertyInBrowser('pathname'),
}: LinkParams) => {
  if (!currentPath) {
    throw TypeError(
      'If running linkIsActive() on the server, you must pass a currentPath'
    )
  }

  const currentPathTrimmed = trimSlashes(currentPath)
  const linkPathTrimmed = trimSlashes(removeBasepath(href))

  return (
    currentPathTrimmed === linkPathTrimmed ||
    currentPathTrimmed.startsWith(`${linkPathTrimmed}/`)
  )
}
