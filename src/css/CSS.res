@genType.import(("@emotion/core", "SerializedStyles"))
type serializedStyles

module Global = {
  @genType.import("@emotion/core") @react.component
  external make: (~styles: array<serializedStyles>) => React.element = "Global"
}

@genType.import(("./app.css", "default"))
external appCss: serializedStyles = "appCss"

@react.component
let make = () => <Global styles={[appCss]} />

export default = make
