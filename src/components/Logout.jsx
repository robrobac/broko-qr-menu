import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth } from '../firebase/config'
import { AuthContext } from '../App'
import { AuthButton } from './StyledButtons'


function Logout() {
    const [user, setUser] = useState(null)
    const {isAuth} = useContext(AuthContext)

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
    }
    
}
export default Logout
