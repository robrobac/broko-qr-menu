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
            console.log("User signed out:", user.email, user)
            await signOut(auth);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <button onClick={handleLogout}>Logout {user?.email}</button>
    )
}
export default Logout
