/**
 * Copied from https://codesandbox.io/s/nervous-mclaren-j8v8y0?file=/src/utils.ts.
 */

interface TransitionHelperArg {
  skipTransition?: boolean
  classNames?: string[]
  updateDOM: () => Promise<void> | void
}

interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
}

export default function transitionHelper({
  skipTransition = false,
  classNames = [],
  updateDOM,
}: TransitionHelperArg) {
  // @ts-expect-error(2339)
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM())
    const ready = Promise.reject(Error('View transitions unsupported'))

    // Avoid spamming the console with this error unless the promise is used.
    ready.catch(() => undefined)

    return {
      ready,
      updateCallbackDone,
      finished: updateCallbackDone,
      skipTransition: () => undefined,
    }
  }

  document.documentElement.classList.add(...classNames)

  // @ts-expect-error(2339)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- missing type.
  const transition = document.startViewTransition(updateDOM) as ViewTransition

  transition.finished.finally(() =>
    document.documentElement.classList.remove(...classNames)
  )

  return transition
}
