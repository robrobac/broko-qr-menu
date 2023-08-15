import styled from 'styled-components'

export const Card = styled.div`
    max-width: 425px;
    -webkit-box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.44);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
    border-radius: 10px;
    color: #235239;
    margin: 3rem auto;
    z-index: 1;
    
`
export const CardImage = styled.img`
    border-radius: 10px 10px 0 0;
    max-width: 100%;
`

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`

export const CardTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    

`
export const CardPrice = styled.div`
    border-radius: 10px;
    color: white;
    background-color: #235239;
    padding: .5rem;
    text-align: center;
`
export const PriceEUR = styled.h4`
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    line-height: 1;
    font-size: 2rem;
    font-weight: 700;
`
export const PriceKN = styled.span`
    font-size: 1rem;
    color: #5b7e6c;
`
export const CardDesc = styled.p`
    text-align: left;
    line-height: 1.5rem;
    margin-bottom: 0;
`
export const CardAdmin = styled.div`
    display: flex;
    justify-content: space-evenly;
`
export const AdminTimestamp = styled.p`
    font-size: .7rem;
    display: flex;
    justify-content: space-evenly;
    color: #5b7e6c;
    margin-bottom: 0;
    /* flex: 1; */
    text-align: center;

`
export const AdminButtons = styled.div`
    display: flex;
    gap: 1rem;

`

export const List = styled(Card)`
    display: flex;
    margin: 1rem auto;
`

export const ListBody = styled(CardBody)`
    flex-direction: column;
    padding: 1rem;
    flex: 1;
    gap: 1rem;
`

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const ListTitle = styled(CardTitle)`
    font-size: 1.2rem;
    text-align: left;
    
`

export const ListDesc = styled(CardDesc)`

`

export const ListPrice = styled(CardPrice)`
    border-radius: 5px;
    padding: .5rem 0.7rem;

`

export const PriceEURlist = styled(PriceEUR)`
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
`
export const PriceKNlist = styled(PriceKN)`
    font-size: .7rem;
    color: #5b7e6c;
`

export const ListAdmin = styled(CardAdmin)`
    display: flex;
    flex-direction: row;
    align-content: space-between;
`