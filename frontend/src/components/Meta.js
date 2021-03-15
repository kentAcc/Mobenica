import React from "react"
import { Helmet } from "react-helmet"
const Meta = ({ title, descripcion, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={descripcion} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
  title: "Bienvenido",
  descripcion: "",
  keywords: "",
}
export default Meta
