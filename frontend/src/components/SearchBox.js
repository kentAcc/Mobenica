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
        className='mr-sm-2 ml-sm-5  bg-green borderwhite heightsearch'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='clear heightsearch btnsearch'>
        Encontrar
      </Button>
      
      
    </Form>
  )
}

export default SearchBox
