module Polished = {
  @genType.import("polished")
  external setLightness: (float, string) => string = "setLightness"

  @genType.import("polished")
  external setSaturation: (float, string) => string = "setSaturation"

  @genType.import("polished")
  external transparentize: (float, string) => string = "transparentize"
}

export linkColor = "#108db8"
export textColor = linkColor |> Polished.setLightness(0.1)
export heavyTextColor = textColor |> Polished.setSaturation(0.7)
export backgroundColor = "#f0f3f4"
export highlightColor = "rebeccapurple"
export highlightColorAlpha20 = highlightColor |> Polished.transparentize(0.8)
export hintColor = highlightColor |> Polished.transparentize(0.98)
