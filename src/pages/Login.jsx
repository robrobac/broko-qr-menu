import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
    return (
        <Form id="loginForm">
            <Form.Group className="mb-3" id="emailForm">
                <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                <Form.Control type="email" id="inputEmail" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" id="passwordForm">
                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                <Form.Control type="password" id="inputPassword" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Login
