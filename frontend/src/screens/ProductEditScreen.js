import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProductDetails, updateProduct } from "../actions/productAction"
import FormContainer from "../components/FormContainer"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import axios from "axios"

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState([])
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [countStock, setCountStock] = useState(0)
  const [description, setDescription] = useState(0)
  const [uploding, setUpLoading] = useState(false)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push("/admin/productList")
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(...image, product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountStock(product.countStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const UploadFileHandler = async (e) => {
    const files = e.target.files
    let images = ""
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append("image", file)
      setUpLoading(true)
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
        const { data } = await axios.post("/api/upload", formData, config)

        images += data + ","
        console.log(images)
        setImage(images)
        setUpLoading(false)
      } catch (error) {
        console.error(error)
        setUpLoading(false)
      }
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        description,
        countStock,
        image,
      })
    )
  }
  return (
    <>
      <Link to='/admin/productList' className='btn btn-ligth my-3'>
        Regresar
      </Link>
      <FormContainer>
        <h1>Edit product</h1>

        {loadingUpdate && <Loader></Loader>}
        {errorUpdate && <Message variant='danger'>{errorUpdate} </Message>}
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>price Addres</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose Fie'
                custom
                multiple
                onChange={UploadFileHandler}
              ></Form.File>
              {uploding && <Loader></Loader>}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand  '
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter countInStock URL'
                value={countStock}
                onChange={(e) => setCountStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category URL'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description URL'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
