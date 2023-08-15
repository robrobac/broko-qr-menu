import styled from 'styled-components'

export const Modal = styled.div`
    display: ${props => (props.$showModal ? "block" : "none")};
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #5b7e6c79;
    padding: 2rem 2rem;
    backdrop-filter: blur(5px);
    
`
export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #5b7e6c;
    
`

export const HeaderTitle = styled.h5`
    font-size: 1.5rem;
    color: #235239;
`
export const HeaderClose = styled.button`
    background-color: unset;
    fill: #5b7e6c;
    height: 2rem;
`

export const ModalBody = styled.div`
    padding: 1rem;
`
export const ModalContent = styled.div`
    max-width: 425px;
    background-color: white;
    margin: 0 auto;
    border-radius: 20px;
`

