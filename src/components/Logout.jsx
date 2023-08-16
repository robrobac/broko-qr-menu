import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth } from '../firebase/config'
import { AppContext } from '../App'
import { AuthButton } from './styledComponents/StyledButtons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


function Logout() {
    const {isAuth} = useContext(AppContext)
    const { t, i18n } = useTranslation()

    const navigate = useNavigate();

    const handleLogin = () => {
        // Use the navigate function to navigate to the "Home" route
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    };

    if (isAuth) {
        return (
            <AuthButton onClick={handleLogout}>{t("Logout")}</AuthButton>
        )
    } else {
        return (
            <AuthButton onClick={handleLogin}>{t("Login")}</AuthButton>
        )
    }
    
}
export default Logout
