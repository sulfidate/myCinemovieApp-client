import React from 'react';
import { Card, Container, Form } from 'react-bootstrap';
import { Form, Row, Col, Card, FormGroup, Button } from "react-bootstrap";
import './current-userdata.scss';

export default function CurrentUserData({ name, email, birthday }) {

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [month, day, year].join('-');
  }

  return (
    <>

      <Card.Body
        className="current-profile-data"
      >

        <Form.Label
          as="h5"
        ></Form.Label>
        <FormGroup>
          <Form.Label className='justify-content-center ml-2'>
            <Button
              variant='outline-info'
              disabled
            >Username: {name}
            </Button>
            <Button
              variant='outline-info'
              disabled
            >Email: {email}
            </Button>
            <Button
              id='birth-date'
              variant='outline-info'
              disabled
            >Birthday: {formatDate(birthday)}
            </Button>
          </Form.Label>
        </FormGroup>
      </Card.Body>


    </>
  )
}
