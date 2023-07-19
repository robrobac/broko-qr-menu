import styled from 'styled-components'

const TabsContainer = styled.div`

`
const Tabs = styled.div`
    display: flex;
    position: sticky;
    top: -20px;
    z-index: 3;
    padding-top: 20px;
    background-color: #5b7e6c;

`
const Tab = styled.button`
    flex: 1;
    height: 64px;
    background-color: ${props => (props.active ? "white" : "#5b7e6c")};
    border-radius: 5px 5px 0 0;
    color: ${props => (props.active ? "#235239" : "white")};
    font-weight: ${props => (props.active ? "700" : "0")};
    font-size: ${props => (props.active ? "1.2rem" : "1rem")};
    transition: font-weight .2s, font-size .2s;
    
`

const Content = styled.div`
    background-color: white;

    ${props => (props.active ? "" : "display:none")}
`
// background-color: ${props => (props.active ? "white" : "#5b7e6c")};
// ${props => (props.active ? "" : "display:none")}

export { TabsContainer, Tabs, Tab, Content }