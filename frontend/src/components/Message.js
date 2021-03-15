import React, { useState, useEffect } from "react"
import { Alert } from "react-bootstrap"

const Message = ({ variant, children, booltemporary = false }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      if (booltemporary) {
        setShow(false)
        console.log("entra")
      }
    }, 3000)

    return () => window.clearTimeout(timeoutID)
  }, [])

  return show ? (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {children}
    </Alert>
  ) : (
    ""
  )
}

Message.defaultProps = {
  variant: "info",
}
export default Message
