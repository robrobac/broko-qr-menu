import React, { useEffect, useState } from 'react'
import Logout from './Logout'
import Logo from "../images/brokologo.png"
import { HeaderLogo, HeaderRight, HeaderWrap, LanguageIcon, LanguageSelect, LanguageTitle, LanguageTitleWrap } from './styledComponents/styledHeader'
import { ReactComponent as GlobeIcon } from "../icons/globeicon.svg";
import { useTranslation } from 'react-i18next';

function Header() {
    const { i18n } = useTranslation()
    const [selectedLanguage, setSelectedLanguage] = useState("hr")
    
    useEffect(() => {
        const cachedData = localStorage.getItem("selectedLanguage");

        if (cachedData) {
            const parsedData = JSON.parse(cachedData)
            setSelectedLanguage(parsedData.selectedLanguage)
            i18n.changeLanguage(parsedData.selectedLanguage)
        }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLanguage = () => {
        if (selectedLanguage === "hr") {
            setSelectedLanguage("en")
            i18n.changeLanguage("en")

            const dataToCache = {
                selectedLanguage: "en",
            };

            localStorage.setItem('selectedLanguage', JSON.stringify(dataToCache));
        } else if (selectedLanguage === "en") {
            setSelectedLanguage("hr")
            i18n.changeLanguage("hr")

            const dataToCache = {
                selectedLanguage: "hr",
            };

            localStorage.setItem('selectedLanguage', JSON.stringify(dataToCache));
        }
    }

    return (
        <HeaderWrap>
            <HeaderLogo src={Logo} alt='logo' className='logoImg'></HeaderLogo>
            <HeaderRight>
                <LanguageSelect onClick={() => handleLanguage()}>
                    <LanguageTitleWrap >
                        <LanguageTitle $isActive={i18n?.language === "hr" ? "true" : undefined}>hr</LanguageTitle>
                        <LanguageTitle>|</LanguageTitle>
                        <LanguageTitle $isActive={i18n?.language === "en" ? "true" : undefined}>en</LanguageTitle>
                    </LanguageTitleWrap>
                    <LanguageIcon>
                        <GlobeIcon/>
                    </LanguageIcon>
                </LanguageSelect>
                <Logout />
            </HeaderRight>
        </HeaderWrap>
    )
}

export default Header
