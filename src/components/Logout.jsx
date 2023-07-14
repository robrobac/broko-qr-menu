import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase/config'


function Logout() {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
        }
    };
    return (
        <button onClick={handleLogout}>Logout {user?.email}</button>
    )
}
export default Logout
