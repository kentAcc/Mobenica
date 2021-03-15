import mongoose from "mongoose"

import dotenv from "dotenv"

import colors from "colors"

import users from "./data/user.js"
import products from "./data/products.js"

import User from "./models/userModel.js"
import Product from "./models/productModule.js"
import Order from "./models/orderModule.js"

import connectDB from "./config/db.js"

dotenv.config()

connectDB()
const importData = async () => {
  console.log("enter".green.inverse)
  try {
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
  await Order.deleteMany()
  await Product.deleteMany()
  await User.deleteMany()

  console.log("many".green.inverse)
  const createUsers = await User.insertMany(users)
  const adminUser = createUsers[0]._id
  console.log("many3".green.inverse)
  const sampleProducts = products.map((product) => {
    return { ...product, user: adminUser }
  })

  await Product.insertMany(sampleProducts)

  console.log("data  imported".green.inverse)
  process.exit()
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log("data  destroyed".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
