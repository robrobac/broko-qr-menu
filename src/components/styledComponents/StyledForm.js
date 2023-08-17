import styled from 'styled-components'

const Form = styled.form`
display: flex;
flex-direction: column;
gap: 1rem;
`

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const FormLabel = styled.label`
    font-weight: 600;
    color: #235239;

`

const FormInput = styled.input`
    font-weight: 500;
    color: #235239;
    width: 100%;


    font-size: 1.4rem;
    padding: 5px 10px;
    border: 1px solid #235239;
    border-radius: 5px;

    &::placeholder {
        font-weight: 300;
        color: #235239;
    }

    &:focus {
        outline: 4px solid #5b7e6c;
        transition: outline linear .05s;
        
    }
`

const FormSelect = styled.select`
    font-weight: 500;
    color: #235239;
    background-color: ${props => (props.disabled ? "#eeeeee" : "white")};


    font-size: 1.4rem;
    padding: 5px 10px;
    border: 1px solid #235239;
    border-radius: 5px;

    &::placeholder {
        font-weight: 300;
        color: #235239;
    }

    &:focus {
        outline: 4px solid #5b7e6c;
        transition: outline linear .05s;
    }

`

const FormTextarea = styled.textarea`
    font-weight: 500;
    color: #235239;


    font-size: 1.4rem;
    padding: 5px 10px;
    border: 1px solid #235239;
    border-radius: 5px;

    &::placeholder {
        font-weight: 300;
        color: #235239;
    }

    &:focus {
        outline: 4px solid #5b7e6c;
        transition: outline linear .05s;
        
    }
`

const FormUpload = styled(FormInput)`
padding-left: 5px;
cursor: pointer;
`

const PriceConversion = styled.p`
    font-size: .8rem;
    color: #235239;
    margin-bottom: 0;
`

const Divider = styled.hr`
margin: 0;
padding: 0;
opacity: 5%;
`

const UploadedImage = styled.img`
    border-radius: 10px;
`

export { Form, FormInput, FormLabel, FormSection, PriceConversion, FormSelect, FormTextarea, FormUpload, Divider, UploadedImage }