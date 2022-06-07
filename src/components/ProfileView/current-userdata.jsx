import React from 'react'
import { Card, Container, Form } from 'react-bootstrap'
import { Form, Row, Col, Card, FormGroup, Button } from 'react-bootstrap'
import './current-userdata.scss'

export default function CurrentUserData({ name, email, birthday }) {
  return (
    <>
      <Card.Body className='current-profile-data'>
        <Form.Label as='h5'></Form.Label>
        <FormGroup>
          <Form.Label className='justify-content-center ml-2'>
            <Button variant='outline-info' disabled>
              Username: {name}
            </Button>
            <Button variant='outline-info' disabled>
              Email: {email}
            </Button>
          </Form.Label>
        </FormGroup>
      </Card.Body>
    </>
  )
}
