import React, { useContext } from 'react'
import { AdminButtons, AdminTimestamp, Card, CardAdmin, CardBody, CardDesc, CardImage, CardPrice, CardTitle, PriceEUR, PriceKN } from './styledComponents/StyledCard'
import { DeleteButton } from './styledComponents/StyledButtons'
import noimage from "../noimage.png"
import EditItemModal from './modals/editItemModal/EditItemModal'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";
import { AppContext } from '../App';

function ProductCard({item, handleDelete, isAdmin, handleReorder, isSearch}) {
    const { handleLoading } = useContext(AppContext)
    
    //  Creating a date object for date created
    const dateCreatedTimestamp = item.dateCreated
    const dateCreated = new Date(dateCreatedTimestamp)

    //  Creating a date object for date edited
    const dateEditedTimestamp = item.dateEdited
    const dateEdited = new Date(dateEditedTimestamp)

    //  formatting options
    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    //  formatting date created and date edited date objects.
    const formattedDateCreated = dateCreated.toLocaleString('en-US', dateOptions)
    const formattedDateEdited = dateEdited.toLocaleString('en-US', dateOptions)

    return (
        <Card>
            <CardImage src={item?.fileUrl} key={item?.id} onError={(e) => { e.target.src = noimage}} onLoad={() => handleLoading(false)}/>
            <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardPrice>
                    <PriceEUR>
                        {typeof item.priceEUR === 'number'
                            ? item.priceEUR.toFixed(2) + '€'
                            : item.priceEUR}
                        <PriceKN>({item.priceKN}kn)</PriceKN>
                    </PriceEUR>
                    
                </CardPrice>
                <CardDesc>{item.description}</CardDesc>
                {isAdmin ? (
                    <CardAdmin>
                        <AdminTimestamp>Created: {formattedDateCreated}</AdminTimestamp>
                        <AdminTimestamp>Edited: {formattedDateEdited}</AdminTimestamp>
                        <AdminButtons>
                            <DeleteButton onClick={() => handleDelete(item)}>
                                <TrashIcon height="100%"/>
                            </DeleteButton>
                            <EditItemModal item={item}/>
                        </AdminButtons>
                        {!isSearch ? (
                            <>
                            <button style={{margin: "5px", padding: "10px"}} onClick={() => handleReorder(item, "up")}>UP</button>
                            <button style={{margin: "5px", padding: "10px"}} onClick={() => handleReorder(item, "down")}>DOWN</button>
                            </>
                        ) : ""}
                    </CardAdmin>
                ) : ""}
            </CardBody>
        </Card>
    )
}

export default ProductCard
