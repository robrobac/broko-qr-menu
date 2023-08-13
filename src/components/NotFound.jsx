import React from 'react'
import { LinkDesc, NotFoundDesc, NotFoundLink, NotFoundMessage, NotFoundPage } from './styledComponents/StyledMisc'
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

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
                    404 Page Not Found
                </NotFoundMessage>
                <NotFoundLink onClick={() => handleGoBack("home")}>Home</NotFoundLink>
                <NotFoundLink onClick={() => handleGoBack("admin")}>Admin <LinkDesc className='buttonDescription'>Login required</LinkDesc></NotFoundLink>
            </NotFoundDesc>
            
        </NotFoundPage>
    )
}

export default NotFound
