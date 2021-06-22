import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import { listTopProducts } from "../actions/productAction"

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.length > 0
        ? products.map((product) => (
            <Carousel.Item key={product._id}>
              <div className='rounded1'>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image.split(",")[0]} alt={product.name} />
                  <Carousel.Caption className='carousel-caption'>
                    <h2>
                      {product.name} (${product.price})
                    </h2>
                  </Carousel.Caption>
                </Link>
              </div>
            </Carousel.Item>
          ))
        : ""}
    </Carousel>
  )
}

export default ProductCarousel
