import React from 'react'
import Logout from './Logout'
import Logo from "../images/brokologo.png"
import { HeaderLogo, HeaderWrap } from './styledComponents/styledHeader'

function Header() {
    return (
        <HeaderWrap>
            <HeaderLogo src={Logo} alt='logo' className='logoImg'></HeaderLogo>
            <Logout />
        </HeaderWrap>
    )
}

export default Header
