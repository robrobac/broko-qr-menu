import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Divider, Form, FormInput, FormLabel, FormSection } from '../components/styledComponents/StyledForm';
import { BackButton, SubmitButton } from '../components/styledComponents/StyledButtons';
import { Modal, ModalBody, ModalContent } from '../components/styledComponents/StyledModal';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t, i18n } = useTranslation()

    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    const handleGoBack = () => {
        // Use the navigate function to navigate to the "Home" route
        navigate('/');
    };

    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user
        } catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        handleLogin(email, password)

        setEmail("")
        setPassword("")
    }

    return (
            <>
            <Loading loading={loading ? 1 : 0}/>
            <Modal $showModal={1} style={{backgroundColor: "#5b7e6c"}}>
                <ModalContent>
                    <ModalBody>
                        <Form id="loginForm" onSubmit={handleFormSubmit}>
                            <FormSection>
                                <FormLabel htmlFor="inputEmail">
                                    {t("Email Address")}
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
                                    {t("Password")}
                                </FormLabel>
                                <FormInput
                                required
                                type="password"
                                id="inputPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            </FormSection>
                            <SubmitButton type="submit">
                                {t("Sign In")}
                            </SubmitButton>
                        </Form>
                        <BackButton style={{marginTop: "1rem", width: "100%"}} onClick={handleGoBack}>
                            {t("Go Back To Home")}
                        </BackButton>
                    </ModalBody>
                </ModalContent>
            </Modal>
            </>
    )
}

export default Login
