import React, { useContext } from 'react'
import { AuthButton } from './styledComponents/StyledButtons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

function Manage({isAdmin}) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const {handleLoading} = useContext(AppContext)

    const handleNavigate = (destination) => {
        handleLoading(true)
        setTimeout(() => {
            navigate(destination)
        }, 200)
        

    }

    if (isAdmin) {
        return (
            <AuthButton onClick={() => handleNavigate('/')}>{t("Home")}</AuthButton>
        )
    } else {
        return (
            <AuthButton onClick={() => handleNavigate('/admin')}>{t("Manage")}</AuthButton>
        )
    }

    
}

export default Manage
