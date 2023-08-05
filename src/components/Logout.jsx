import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth } from '../firebase/config'
import { AuthContext } from '../App'
import { AuthButton } from './StyledButtons'
import { useNavigate } from 'react-router-dom'


function Logout() {
    const [user, setUser] = useState(null)
    const {isAuth} = useContext(AuthContext)

    const navigate = useNavigate();

    const handleLogin = () => {
        // Use the navigate function to navigate to the "Home" route
        navigate('/login');
    };

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

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
