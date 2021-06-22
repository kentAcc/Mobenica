import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import Meta from "../components/Meta"
import { listProducts } from "../actions/productAction"
import ProductCarouserl from "../components/ProductCarouserl"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  console.log(products)
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta></Meta>
      {!keyword ? (
        <ProductCarouserl></ProductCarouserl>
      ) : (
        <Link to='/' className='btn btn-light'>
          Regresar
        </Link>
      )}

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products
              ? products.map((product, index) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={index}>
                    <Product product={product} key={product._id.toString()} />
                  </Col>
                ))
              : ""}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default HomeScreen
