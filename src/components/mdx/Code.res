module SyntaxHighlighter = {
  type langDef

  type langs = [#rescript]

  // React.element is not the same as ReactNode, although it should be
  @genType.import(("react", "ReactNode"))
  type node = React.element

  @genType.import("react-syntax-highlighter") @react.component
  external make: (~children: node=?) => React.element = "Light"

  @genType.import(("react-syntax-highlighter", "Light.registerLanguage"))
  external registerLanguage: (langs, langDef) => unit = "registerLanguage"

  // No genType as we don't want TS to check this vendored file
  @module("../../plugins/rescript-lang") external rescriptLangDef: langDef = "default"
}

SyntaxHighlighter.registerLanguage(#rescript, SyntaxHighlighter.rescriptLangDef)
