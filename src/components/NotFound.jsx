import React from 'react'
import { LinkDesc, NotFoundDesc, NotFoundLink, NotFoundMessage, NotFoundPage } from './styledComponents/StyledMisc'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
    const navigate = useNavigate();

    const { t } = useTranslation()

    const handleGoBack = (page) => {
        if (page === "home") {
            navigate('/');
        } else if (page === "admin") {
            navigate('/admin');
        }
        
    };

    return (
        <NotFoundPage>
            
            <NotFoundDesc>
                <NotFoundMessage>
                    {t("404 Page Not Found")}
                </NotFoundMessage>
                <NotFoundLink onClick={() => handleGoBack("home")}>
                    {t("Home")}
                </NotFoundLink>
                <NotFoundLink onClick={() => handleGoBack("admin")}>
                    {t("Admin")}
                    <LinkDesc className='buttonDescription'>
                        {t("Login Required")}
                    </LinkDesc>
                </NotFoundLink>
            </NotFoundDesc>
            
        </NotFoundPage>
    )
}

export default NotFound
