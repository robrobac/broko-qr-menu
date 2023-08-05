import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Divider, Form, FormInput, FormLabel, FormSection } from '../components/styledComponents/StyledForm';
import { BackButton, SubmitButton } from '../components/styledComponents/StyledButtons';
import { Modal, ModalBody, ModalContent } from '../components/styledComponents/StyledModal';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleGoBack = () => {
        // Use the navigate function to navigate to the "Home" route
        navigate('/');
    };

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
        <Modal $showModal={1}>
            <ModalContent>
                <ModalBody>
                    <Form id="loginForm" onSubmit={handleFormSubmit}>
                        <FormSection>
                            <FormLabel htmlFor="inputEmail">
                                Email address
                            </FormLabel>
                            <FormInput
                            required
                            type="email"
                            id="inputEmail"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        </FormSection>
                        <Divider></Divider>
                        <FormSection>
                            <FormLabel htmlFor="inputPassword">
                                Password
                            </FormLabel>
                            <FormInput
                            required
                            type="password"
                            id="inputPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </FormSection>
                        <SubmitButton type="submit">
                            Sign In
                        </SubmitButton>
                    </Form>
                    <BackButton style={{marginTop: "1rem", width: "100%"}} onClick={handleGoBack}>
                    Go Back To Home
                    </BackButton>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Login
