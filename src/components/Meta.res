module Helmet = {
  @genType.import("react-static") @react.component
  external make: (
    ~title: string=?,
    ~titleTemplate: string=?,
    ~children: GenType.reactNode=?,
  ) => React.element = "Head"
}

@genType.import(("../../static.config", "SiteData"))
type siteData = {title: string}

@genType.import("react-static")
external useSiteData: unit => siteData = "useSiteData"

type blogPostData = {publishedDate: option<Js.Date.t>}

let buildStructuredData = ({publishedDate}) => {
  let s = Js.Json.string

  let data = Js.Dict.fromList(
    list{
      Some("@context", "http://schema.org"->s),
      publishedDate->Option.map(date => ("datePublished", date->Js.Date.toISOString->s)),
      Some(
        "author",
        Js.Dict.fromList(list{("@type", "Person"->s), ("name", "Ben Styles"->s)})->Js.Json.object_,
      ),
    }->List.keepMap(x => x),
  )

  <script type_="application/ld+json">
    {data->Js.Json.object_->Js.Json.stringify->React.string}
  </script>
}

@react.component
let make = (~title: option<string>=?, ~blogPostData: option<blogPostData>=?) => {
  open Option

  let {title: defaultTitle} = useSiteData()

  <Helmet
    titleTemplate=?{title->map(_ => "%s | Ben Styles")} title={title->getWithDefault(defaultTitle)}>
    {blogPostData->mapWithDefault(React.null, buildStructuredData)}
  </Helmet>
}

export default = make
