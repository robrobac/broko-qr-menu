import styled from 'styled-components'

export const CategoryContainer = styled.div`
    border-bottom: 1px solid #5b7e6c;

    &:last-of-type {
        border-bottom: none;
    }
`

export const CategoryItems = styled.div`

`
export const CategoryTitle = styled.h2`
    padding-top: 3rem;
    color: #235239;
    font-weight: 700;
    font-size: 2rem;
    padding-bottom: 1rem; 
    text-align: center;  
`

export const CategoryControls = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem 0;
`