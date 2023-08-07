import React from 'react'
import Logout from './Logout'
import Logo from "../images/brokologo.png"
import "./Header.scss"

function Header() {
    return (
        <header>
            <img src={Logo} alt='logo' className='logoImg'></img>
            <Logout />
        </header>
    )
}

export default Header
