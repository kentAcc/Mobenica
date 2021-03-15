import AsyncHandler from "express-async-handler"
import Order from "../models/orderModule.js"

//@description  Create new order
//@route        post /api/orders
//@acces        Private
const addOrderItems = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.lengh === 0) {
    res.status(400)
    throw new Error("no order items")
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

//@description  get order by id
//@route        get /api/orders/:id
//@acces        Private
const getOrderById = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@description Update order to paid
//@route        get /api/orders/:id/pay
//@acces        Private
const updateOrderToPaid = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@description Update order to deliverd
//@route        get /api/orders/:id/deliverd
//@acces        Private/admin
const updateOrderToDeliverd = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  console.log("order")
  console.log(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliverdAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})
//@description  get looged in user orders
//@route        get /api/orders/myorders
//@acces        Private
const getMyOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.json(orders)
})
//@description  get looged in user orders
//@route        get /api/orders
//@acces        Private admin
const getallOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id  name")

  res.json(orders)
})
export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getallOrders,
  updateOrderToDeliverd,
}
