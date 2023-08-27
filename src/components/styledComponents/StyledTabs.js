import styled from 'styled-components'

const TabsContainer = styled.main`

`
const Tabs = styled.div`
    display: flex;
    position: sticky;
    top: 46px;
    z-index: 3;
    padding-top: 10px;
    background-color: #5b7e6c;

`
const Tab = styled.button`
    flex: 3;
    height: 48px;
    background-color: ${props => (props.$isActive ? "white" : "#5b7e6c")};
    border-radius: 5px 5px 0 0;
    color: ${props => (props.$isActive ? "#235239" : "white")};
    font-weight: ${props => (props.$isActive ? "700" : "0")};
    font-size: ${props => (props.$isActive ? "1.2rem" : "1rem")};
    transition: font-weight .2s, font-size .2s;
    cursor: pointer;
`

const ContentHome = styled.div`
    background-color: white;
    ${props => (props.$isActive ? "" : "display:none")}
`

const Icon = styled.div`
    fill: ${props => (props.$isActive ? "#235239" : "white")};
    height: ${props => (props.$isActive ? "2rem" : "1rem")};
    transition: height .2s;
`
// background-color: ${props => (props.active ? "white" : "#5b7e6c")};
// ${props => (props.active ? "" : "display:none")}

export { TabsContainer, Tabs, Tab, ContentHome, Icon }