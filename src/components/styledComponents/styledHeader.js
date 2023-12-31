import styled from 'styled-components'

export const HeaderWrap = styled.header`
    position: sticky;
    z-index: 10;
    top: 0;
    padding: .5rem 1rem;
    background-color: #235239;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const HeaderRight = styled.div`
    display: flex;
    width: 180px;
    justify-content: space-between;
`

export const HeaderLogo = styled.img`
    height: 30px;
`

export const LanguageSelect = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
`
export const LanguageTitleWrap = styled.div`
    display: flex;
    gap: 5px;
    color: #5b7e6c;
`

//
export const LanguageTitle = styled.p`
    color: ${(props) => (props.$isActive) ? "white" : "#5b7e6c"};
`

//
export const LanguageIcon = styled.div`
    background-color: white;
    fill: #235239;
    border-radius: 30px;
    height: 1.5rem;
    width: 1.5rem;
    padding: 1px;
`
export const LanguageSticky = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 2.5rem;
    width: 6rem;
    background-color: #ffffff;
    border: 1px solid #dadada;
    -webkit-box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.20);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.20);
    opacity: ${(props) => (props.$show) ? "100" : "0"};
    pointer-events: ${(props) => (props.$show) ? "unset" : "none"};
    transition: opacity .2s ease-in-out;

    `


//
export const LanguageTitleSticky = styled.p`
    color: ${(props) => (props.$isActive) ? "#235239" : "#dadada"};
`

//
export const LanguageIconSticky = styled(LanguageIcon)`
    background-color: #5b7e6c;
    fill: white;
`

export const BurgerSlide = styled.div`
    overflow: hidden;
    padding: 0 64px 0 1rem;
    top: 0;
    opacity: ${(props) => (props.$isOpen) ? 1 : 0};
    right: 0px;
    width: ${(props) => (props.$isOpen) ? "100%" : "0"};
    position: absolute;
    z-index: 20;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: #23523999;
    backdrop-filter: blur(3px);
    transition: opacity .5s ease, width .5s ease-out;
`