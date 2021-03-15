import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col ,Card} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import Meta from "../components/Meta"
import { listProducts } from "../actions/productAction"
import ProductCarouserl from "../components/ProductCarouserl"
 
import {Helmet} from 'react-helmet';
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
console.log(process.env.PUBLIC_URL)
console.log("process.env.PUBLIC_URL")
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

          <Row  >
            <Col xs={6} sm={6} md={6} lg={6} xl={6} className='flexx '>
            <Link to={`/tipoo/1/nivel/3`}>
              <Card.Img
                className='card-1'
                src={"images/s1.jpg"}
              ></Card.Img>
              </Link>
            </Col>
          <Col xs={6}  sm={6} md={6} lg={6} xl={6} className='flexx '>
            <Link to={`/tipoo/2/nivel/3`}>
              <Card.Img
                className='card-1'
                src="images/s2.jpg"
              ></Card.Img>
              </Link>
            </Col>
          </Row>
          <Row  >
            <Col xs={6} sm={6} md={6} lg={6} xl={6} className='flexx '>
            <Link to={`/tipoo/1/nivel/3`}>
              <Card.Img
                className='card-1'
                src={"images/s3.jpg"}
              ></Card.Img>
              </Link>
            </Col>
          <Col xs={6}  sm={6} md={6} lg={6} xl={6} className='flexx '>
            <Link to={`/tipoo/2/nivel/3`}>
              <Card.Img
                className='card-1'
                src="images/s4.jpg"
              ></Card.Img>
              </Link>
            </Col>
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
