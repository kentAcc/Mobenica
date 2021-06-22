import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <a
              href='https://api.whatsapp.com/send?phone=525564710200&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20DfMuebles.'
              class='float'
              target='_blank'
            >
              <i class='fab fa-whatsapp my-float'></i>
            </a>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3 '>
            Copyrigth &copy;
            <strong className='font-bold'>
               powerd by : <Link to={{ pathname: "http://www.ahoraaqui.com" }} target="_blank" >www.ahoraaqui.com</Link> abraham.kent.7@gmail.com
               

            </strong>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
