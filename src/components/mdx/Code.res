module Language = {
  type t = [#rescript | #sh | #json | #diff]

  type def

  // No genType as we don't want TS to check this vendored file
  @module external rescript: def = "../../plugins/rescript-lang"

  @genType.import(("react-syntax-highlighter/dist/cjs/languages/hljs/bash", "default"))
  external bash: def = "bash"
  @genType.import(("react-syntax-highlighter/dist/cjs/languages/hljs/json", "default"))
  external json: def = "json"
  @genType.import(("react-syntax-highlighter/dist/cjs/languages/hljs/diff", "default"))
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
    ~className: string=?,
  ) => React.element = "Light"

  @genType.import(("react-syntax-highlighter", "Light.registerLanguage"))
  external registerLanguage: (Language.t, Language.def) => unit = "registerLanguage"

  @genType.import("react-syntax-highlighter/dist/cjs/styles/hljs")
  external defaultStyle: providedStyle = "nightOwl"
}

[#rescript, #sh, #json, #diff]->Array.forEach(lang =>
  SyntaxHighlighter.registerLanguage(lang, Language.langToDef(lang))
)

@react.component
let make = (~className, ~children) => {
  let language = switch className |> String.split_on_char('-') {
  | list{_, language, ..._} => Some(language)
  | list{_}
  | list{} =>
    None
  }

  <SyntaxHighlighter
    className={%css(`
      border-radius: 5px;
    `)}
    ?language
    style={SyntaxHighlighter.defaultStyle}>
    children
  </SyntaxHighlighter>
}

export default = make
