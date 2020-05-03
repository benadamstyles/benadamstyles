import * as React from 'react'

export default class Catch extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <p>... an error has occurred!</p>
          <p>{String(this.state.error)}</p>
        </>
      )
    }

    return this.props.children
  }
}
