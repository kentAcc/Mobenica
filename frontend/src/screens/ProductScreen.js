import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap"
import Rating from "../components/Rating"
import Message from "../components/Message"
import Meta from "../components/Meta"
import Loader from "../components/Loader"
import {
  listProductDetails,
  createProductReview,
} from "../actions/productAction"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import ImageZoom from "../components/ImageZoom"
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  //const [data, setData] = useState("")
  const dispatch = useDispatch()

  const productDatails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDatails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert("review submitted")
      setRating(0)
      setComment("")
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    } else {
    }

    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createProductReview(match.params.id, { rating, comment }))
  }

  return (
    <>
      <Link className='btn btn-light my-4' to='/'>
        Regresar
      </Link>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger' booltemporary='false'>
          {error}
        </Message>
      ) : (
        <>
          <Meta title={product.name}></Meta>
          <Row  >
            <Col md={7}>
              <ImageZoom images={product.image}></ImageZoom>
            </Col>

              <Col md={5}>
              <Row>
                <Col  md={6}>
                  <ListGroup variant='flush'>
                  <ListGroup.Item>
                  <h2>{product.name}</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Rating
                  value={product.rating}
                  text={`${product.numReviews} reseñas`}
                  ></Rating>
                  </ListGroup.Item>

                  <ListGroup.Item>Precio:${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                  Descripción:{product.description}
                  </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                <Card>
                <ListGroup>
                <ListGroup.Item>
                <Row>
                <Col> Precio:</Col>
                <Col>
                <strong> ${product.price}</strong>
                </Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                <Col> Intentario:</Col>
                <Col>
                {product.countStock > 0
                ? "Existencia"
                : "Fuera de existencia"}
                </Col>
                </Row>
                </ListGroup.Item>
                {product.countStock > 0 && (
                <ListGroupItem>
                <Row>
                <Col>#</Col>
                <Col>
                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>              
                {[...Array(product.countInStock).keys()].map(
                (x) => (
                <option key={x + 1} value={x + 1}> {x + 1}  </option>                               
                )
                )}
                </Form.Control>
                </Col>
                </Row>
                </ListGroupItem>
                )}
               
                </ListGroup>
                </Card>
                </Col>
              
              </Row>
             <Row  className=" mt-3">
                  <Col>
                  <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>                
                    Add to cart
                </Button>
                  </Col>

             </Row>
            </Col>
           
                           
          </Row>
           
        </>
      )}
    </>
  )
}

export default ProductScreen
