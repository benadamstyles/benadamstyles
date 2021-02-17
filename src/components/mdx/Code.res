module Language = {
  @deriving(jsConverter)
  type t = [#rescript | #sh | #json | #diff]

  type def

  // No genType as we don't want TS to check this vendored file
  @module("../../plugins/rescript-lang") external rescript: def = "default"

  @genType.import(("react-syntax-highlighter/dist/esm/languages/hljs/bash", "default"))
  external bash: def = "bash"
  @genType.import(("react-syntax-highlighter/dist/esm/languages/hljs/json", "default"))
  external json: def = "json"
  @genType.import(("react-syntax-highlighter/dist/esm/languages/hljs/diff", "default"))
  external diff: def = "diff"

  let langToDef = (lang: t) =>
    switch lang {
    | #rescript => rescript
    | #sh => bash
    | #json => json
    | #diff => diff
    }
}

module SyntaxHighlighter = {
  type providedStyle

  // React.element is not the same as ReactNode, although it should be
  @genType.import(("react", "ReactNode"))
  type node = React.element

  @genType.import("react-syntax-highlighter") @react.component
  external make: (
    ~language: string=?,
    ~style: providedStyle=?,
    ~children: node=?,
  ) => React.element = "Light"

  @genType.import(("react-syntax-highlighter", "Light.registerLanguage"))
  external registerLanguage: (Language.t, Language.def) => unit = "registerLanguage"

  @genType.import("react-syntax-highlighter/dist/esm/styles/hljs")
  external defaultStyle: providedStyle = "nightOwl"
}

[#rescript, #sh, #json, #diff]->Array.forEach(lang =>
  SyntaxHighlighter.registerLanguage(lang, Language.langToDef(lang))
)

@react.component
let make = (~lang, ~children) => {
  Js.log(lang->Language.tToJs)
  <SyntaxHighlighter language={lang->Language.tToJs} style={SyntaxHighlighter.defaultStyle}>
    children
  </SyntaxHighlighter>
}

export default = make
