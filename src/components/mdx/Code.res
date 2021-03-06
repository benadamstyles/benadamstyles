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

  @genType.import("react-syntax-highlighter") @react.component
  external make: (
    ~language: string=?,
    ~style: providedStyle=?,
    ~children: GenType.reactNode=?,
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

  // Remove trailing line breaks or spaces to avoid
  // the gap at the bottom of every code block.
  let code = children->Js.String2.replaceByRe(%re("/\s+$/"), "")

  <SyntaxHighlighter
    className={%css(`
      border-radius: 5px;
    `)}
    ?language
    style={SyntaxHighlighter.defaultStyle}>
    {code->React.string}
  </SyntaxHighlighter>
}

export default = make

module Inline = {
  module StyledCode = %styled.code(`
    background-color: rgb(214, 222, 235);
    padding: 0.2rem;
    border-radius: 5px;
  `)

  @react.component
  export make = (~children) => <StyledCode> children </StyledCode>
}
