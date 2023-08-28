import React, { useEffect, useState } from 'react'
import Hamburger from 'hamburger-react'
import { BurgerSlide, LanguageIcon, LanguageSelect, LanguageTitle, LanguageTitleWrap } from './styledComponents/styledHeader'
import { ReactComponent as GlobeIcon } from "../icons/globeicon.svg";
import { useTranslation } from 'react-i18next';
import Logout from './Logout';
import { Navigate } from 'react-router-dom';
import { t } from 'i18next';
import { AuthButton } from './styledComponents/StyledButtons';
import Manage from './Manage';

function HamburgerMenu({isAdmin}) {
    const { t, i18n } = useTranslation()
    const [selectedLanguage, setSelectedLanguage] = useState("hr")
    const [isOpen, setOpen] = useState(false)
    
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
        <>
        <BurgerSlide $isOpen={isOpen}>
            <Manage isAdmin={isAdmin} />
            <Logout />
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
        </BurgerSlide>
        {/* TODO: create a styled component out of this */}
        <div className='burgerButton' style={{margin: "-9px", position: "absolute", right: "1rem", top: "7px", zIndex: "25", WebkitTapHighlightColor: "rgba(255, 255, 255, 0)"}}>
            <Hamburger size={30} rounded hideOutline={true} toggled={isOpen} toggle={setOpen} color='white'/>
        </div>
        </>
    )
}

export default HamburgerMenu
