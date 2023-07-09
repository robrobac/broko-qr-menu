import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user
            console.log("user logged in:", user.email, user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        handleLogin(email, password)

        setEmail("")
        setPassword("")
    }

    return (
        <Form id="loginForm" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" id="emailForm">
                <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                <Form.Control
                type="email"
                id="inputEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" id="passwordForm">
                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                <Form.Control
                type="password"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Login
