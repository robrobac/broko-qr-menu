import styled from 'styled-components'

const Button = styled.button`
    text-transform: uppercase;
    line-height: 2;
    border-radius: 10px;
    padding: 0 10px;
    cursor: pointer;
`;

const DeleteButton = styled(Button)`
    background-color: unset;
    fill: #dc3545;
    height: 2rem;
    padding: 0;
`

const EditButton = styled(Button)`
    background-color: unset;
    fill: #5b7e6c;
    height: 2rem;
    padding: 0;
`
const BackButton = styled(Button)`
    background-color: #5b7e6c;
    color: white;
    padding: 1rem;
    font-weight: 700;
`

const AuthButton = styled(Button)`
    background-color: #23523999;
    color: white;
    border: 1px solid white;
`

const NavigationButton = styled(Button)`
    background-color: ${(props) => (props.$isActive) ? "#235239" : "white"};
    color: ${(props) => (props.$isActive) ? "white" : "#235239"};
    border: 1px solid #235239;
    height: 38px;
    font-weight: 700;
    white-space: nowrap;
    transition: color .1s ease-in, background-color .1s ease-in;
`

const AddProductButton = styled(Button)`
    background-color: #235239;
    color: white;
    padding: 1rem;

    position: fixed;
    left: .5rem;
    bottom: .5rem;

    -webkit-box-shadow: 0px 5px 20px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 20px 6px rgba(0, 0, 0, 0.2);
`
const SubmitButton = styled(AddProductButton)`
    font-weight: 700;
    position: unset;
    left: unset;
    bottom: unset;

`

const AddCategoryButton = styled.button`
    font-size: .8rem;
    text-decoration: underline;
    color: #235239;
    background-color: unset;
    padding: 0 5px;

`

const UpDownButton = styled(Button)`
    background-color: unset;
    fill: ${(props) => (props.$isActive) ? "#5b7e6c" : "#235239"};
    height: 2rem;
    padding: 0;
`

export const ViewContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: .5rem;
    padding: .5rem .5rem 1rem .5rem;
    position: sticky;
    top: 143px;
    z-index: 8;
`

export const ViewButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 2.5rem;
    width: 2.5rem;
    padding: ${(props) => (props.$isActive) ? "5px" : "10px"};
    background-color: #ffffff;
    fill: ${(props) => (props.$isActive) ? "#5b7e6c" : "#dadada"};
    border: ${(props) => (props.$isActive) ? "1px solid #dadada" : "1px solid #dadada"};
    transition: padding .1s ease-in, fill .15s ease-in;
    -webkit-box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.20);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.20);
`

export { Button, DeleteButton, EditButton, AuthButton, NavigationButton, AddProductButton, AddCategoryButton, SubmitButton, BackButton, UpDownButton }