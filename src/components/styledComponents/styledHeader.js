import styled from 'styled-components'

export const HeaderWrap = styled.header`
    padding: 1rem;
    background-color: #235239;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const HeaderRight = styled.div`
    display: flex;
    width: 170px;
    justify-content: space-between;
`

export const HeaderLogo = styled.img`
    height: 30px;
`

export const LanguageSelect = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
`
export const LanguageTitleWrap = styled.div`
    display: flex;
    gap: 5px;
    color: #5b7e6c;
`
export const LanguageTitle = styled.p`
    color: ${(props) => (props.$isActive) ? "white" : "#5b7e6c"};
`
export const LanguageIcon = styled.div`
    background-color: white;
    fill: #235239;
    border-radius: 30px;
    height: 1.5rem;
    width: 1.5rem;
    padding: 1px;
`