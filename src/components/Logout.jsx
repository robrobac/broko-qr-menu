import React, { useContext } from 'react'
import { AppContext } from '../App'
import { AuthButton } from './styledComponents/StyledButtons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { handleLogout } from '../hooks/useAuth'


function Logout() {
    const {isAuth} = useContext(AppContext)
    const { t } = useTranslation()

    const navigate = useNavigate();

    if (isAuth) {
        return (
            <AuthButton onClick={handleLogout}>{t("Logout")}</AuthButton>
        )
    } else {
        return (
            <AuthButton onClick={() => navigate('/login')}>{t("Login")}</AuthButton>
        )
    }
    
}
export default Logout
