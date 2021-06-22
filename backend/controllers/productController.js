import AsyncHandler from "express-async-handler"
import Product from "../models/productModule.js"

//@description  Fetch all products
//@route        GEt /api/products
//@acces        public
const getProducts = AsyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@description  Fetch single product
//@route        GEt /api/products/:id
//@acces        public
const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})

//@description  delete product
//@route        Delete /api/products/:id
//@acces        Private admin
const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "product removed" })
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})

//@description  create product
//@route        post /api/products/
//@acces        Private admin
const createProduct = AsyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    brand: "sample brand",
    description: "sample description",
  })

  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

//@description  update product
//@route        put /api/products/:id
//@acces        Private admin
const updateProduct = AsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

//@description  create new review
//@route        post /api/products/:id/reviews
//@acces        Private
const createProductReview = AsyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("product already reviewed")
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: "reviwed added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

//@description  get top rated products
//@route        get /api/products/top
//@acces        Private
const getTopProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
