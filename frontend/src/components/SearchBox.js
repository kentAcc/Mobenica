import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("")
  const SubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }
  return (
    <Form onSubmit={SubmitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Buscar productos...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 clear'>
        Encontrar
      </Button>
      <a
        class='linkw'
        href='https://api.whatsapp.com/send?phone=525617740381&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20DfMuebles%202.'
        target='_blank'
      >
        <div class='nofloat'>
          <i class='fab fa-whatsapp my-float2'></i>
          <div class='ml notext'>5617740381</div>
        </div>
      </a>
      <a
        class='linkw'
        href='https://api.whatsapp.com/send?phone=525543070021&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20DfMuebles%202.'
        target='_blank'
      >
        <div class='nofloat'>
          <i class='fab fa-whatsapp my-float2'></i>
          <div class='ml notext'>5543070021</div>
        </div>
      </a>
    </Form>
  )
}

export default SearchBox
