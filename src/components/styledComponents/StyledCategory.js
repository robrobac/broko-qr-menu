import styled from 'styled-components'

export const CategoryContainer = styled.div`
    border-bottom: 1px solid #5b7e6c;

    &:last-of-type {
        border-bottom: none;
        padding-bottom: 5rem;
    }

`

export const CategoryItems = styled.div`
    padding: 0 1rem;
`
export const CategoryTitle = styled.h2`
    
    color: #235239;
    font-weight: 700;
    font-size: 2rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    text-align: left;
    max-width: 425px;
    margin: 0 auto;
    margin-top: 34px;
`

export const CategoryControls = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem 0;
`