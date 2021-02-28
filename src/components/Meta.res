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

type blogPost = {
  createdDate: option<Js.Date.t>,
  publishedDate: option<Js.Date.t>,
  updatedDate: option<Js.Date.t>,
  title: string,
  tags: array<string>,
}

let buildStructuredData = ({createdDate, publishedDate, updatedDate, title, tags}) => {
  let s = Js.Json.string

  let data = Js.Dict.fromList(
    list{
      Some("@context", "https://schema.org"->s),
      Some("@type", "BlogPosting"->s),
      Some("headline", title->s),
      Some("keywords", tags->Array.joinWith(", ", x => x)->s),
      createdDate->Option.map(date => ("dateCreated", date->Js.Date.toISOString->s)),
      publishedDate->Option.map(date => ("datePublished", date->Js.Date.toISOString->s)),
      updatedDate->Option.map(date => ("dateModified", date->Js.Date.toISOString->s)),
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
let make = (~title, ~blogPostData) => {
  open Option

  let {title: defaultTitle} = useSiteData()

  <Helmet
    titleTemplate=?{title->map(_ => `%s | ${defaultTitle}`)}
    title={title->getWithDefault(defaultTitle)}>
    {blogPostData->mapWithDefault(React.null, buildStructuredData)}
  </Helmet>
}

export default = make
