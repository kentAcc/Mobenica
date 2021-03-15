import React from "react"
import PropTypes from "prop-types"
import SliderImage from "react-zoom-slider"

const ImageZoom = (images) => {
  var data = {}
  var tempData = []
  const data3 = [
    {
      image:
        "https://cdn.tgdd.vn/Products/Images/42/209800/oppo-reno2-f-xanh-1-org.jpg",
      text: "img1",
    },
    {
      image:
        "https://cdn.tgdd.vn/Products/Images/42/209800/oppo-reno2-f-xanh-4-org.jpg",
      text: "img2",
    },
    {
      image:
        "https://cdn.tgdd.vn/Products/Images/42/209800/oppo-reno2-f-xanh-10-org.jpg",
      text: "img3",
    },
  ]

  if (images.images) {
    var imagesarraystring = images.images.substring(0, images.images.length - 1)
    const imagesArray = imagesarraystring.split(",")
    imagesArray.forEach((string) => {
      var data1 = {}
      console.log("foreach")
      data1["image"] = string
      data1["text"] = ""

      tempData.push(data1)
    })
    data = tempData
  }
  console.log(tempData)
  return (
    <>
      {tempData.length > 0 ? (
        <SliderImage
          data={data}
          width='100%'
          showDescription={true}
          direction='rigth'
        />
      ) : (
        ""
      )}
    </>
  )
}

ImageZoom.propTypes = {
  images: PropTypes.string,
}
export default ImageZoom
