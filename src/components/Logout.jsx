import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase/config'
import { AuthContext } from '../App'
import { AuthButton } from './styledComponents/StyledButtons'
import { useNavigate } from 'react-router-dom'


function Logout() {
    const {isAuth} = useContext(AuthContext)

    const navigate = useNavigate();

    const handleLogin = () => {
        // Use the navigate function to navigate to the "Home" route
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
        }
    };

    if (isAuth) {
        return (
            <AuthButton onClick={handleLogout}>Logout</AuthButton>
        )
    } else {
        return (
            <AuthButton onClick={handleLogin}>Login</AuthButton>
        )
    }
    
}
export default Logout
