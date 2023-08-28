import React, { useContext } from 'react'
import { AppContext } from '../App'
import { AuthButton } from './styledComponents/StyledButtons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { handleLogout } from '../hooks/useAuth'


function Logout() {
    const {isAuth} = useContext(AppContext)
    const { t } = useTranslation()



    if (isAuth) {
        return (
            <AuthButton onClick={handleLogout}>{t("Logout")}</AuthButton>
        )
    }
}
export default Logout
