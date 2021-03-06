import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listAllOrders } from "../actions/orderActions"

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const orderListAll = useSelector((state) => state.orderListAll)
  const { loading, error, orders } = orderListAll

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders())
    } else {
      history.push("/login")
    }
  }, [dispatch, history, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      // dispatch(deleteUsers(id))
    }
  }
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>user</th>
              <th>date</th>
              <th>total</th>
              <th>paid</th>
              <th>deliver</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(10)
                  ) : (
                    <i className='fas fa-times'></i>
                  )}
                </td>
                <td>
                  {order.isDeliverd ? (
                    order.deliverdAt.substring(10)
                  ) : (
                    <i className='fas fa-times'></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
