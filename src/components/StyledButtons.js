import styled from 'styled-components'

const Button = styled.button`
    text-transform: uppercase;
    line-height: 2;
    border-radius: 5px;
    padding: 0 10px;
`;

const DeleteButton = styled(Button)`
    background-color: #dc3545;
    color: white;
`

const EditButton = styled(Button)`
    background-color: #5b7e6c;
    color: white;
`

const AuthButton = styled(Button)`
    background-color: unset;
    color: white;
    border: 1px solid white;
`

const NavigationButton = styled(Button)`
    background-color: ${(props) => (props.$isActive) ? "#235239" : "white"};
    color: ${(props) => (props.$isActive) ? "white" : "#235239"};
    border: 1px solid #235239;
    padding: 10px 10px;
    font-weight: 500;
    white-space: nowrap;
`

const AddProductButton = styled(Button)`
    background-color: #235239;
    color: white;
    padding: 1rem;

    position: fixed;
    left: 1rem;
    bottom: 1rem;

    -webkit-box-shadow: 0px 5px 20px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 20px 6px rgba(0, 0, 0, 0.2);
`
const SubmitButton = styled(AddProductButton)`
    font-weight: 500;
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

export { Button, DeleteButton, EditButton, AuthButton, NavigationButton, AddProductButton, AddCategoryButton, SubmitButton }