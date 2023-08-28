import React from 'react'
import Logo from "../images/brokologo.png"
import { HeaderLogo, HeaderRight, HeaderWrap } from './styledComponents/styledHeader'


import HamburgerMenu from './HamburgerMenu';

function Header({isAdmin}) {
    

    return (
        <HeaderWrap>
            <HeaderLogo src={Logo} alt='logo' className='logoImg'></HeaderLogo>
            <HeaderRight>
                <HamburgerMenu isAdmin={isAdmin}/>
            </HeaderRight>
        </HeaderWrap>
    )
}

export default Header
