const trimSlashes = (pathname: string) =>
  pathname.trim().replace(/^\//u, '').replace(/\/$/u, '')

interface LinkParams {
  href: string
  currentPath: string
}

// NOTE: In a server-side build, I think the hrefs get prefixed with the
// basepath *after* React runs. Therefore, the hrefs will only start with 'http'
// in the browser, so it's safe to reference window.
const removeBasepath = (href: string) =>
  href.startsWith('http')
    ? new URL(href, window.location.origin).pathname
    : href

export const linkIsActive = ({ href, currentPath }: LinkParams) => {
  const currentPathTrimmed = trimSlashes(currentPath)
  const linkPathTrimmed = trimSlashes(removeBasepath(href))

  return (
    currentPathTrimmed === linkPathTrimmed ||
    currentPathTrimmed.startsWith(`${linkPathTrimmed}/`)
  )
}
