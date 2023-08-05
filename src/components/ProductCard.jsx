import React from 'react'
import { AdminButtons, AdminTimestamp, Card, CardAdmin, CardBody, CardDesc, CardImage, CardPrice, CardTitle, PriceEUR, PriceKN } from './styledComponents/StyledCard'
import { DeleteButton } from './styledComponents/StyledButtons'
import noimage from "../noimage.png"
import EditItemModal from './modals/editItemModal/EditItemModal'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";

function ProductCard({item, handleDelete, isAdmin}) {

    const dateCreatedTimestamp = item.dateCreated
    const dateCreated = new Date(dateCreatedTimestamp)

    const dateEditedTimestamp = item.dateEdited
    const dateEdited = new Date(dateEditedTimestamp)

    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };

    const formattedDateCreated = dateCreated.toLocaleString('en-US', dateOptions)
    const formattedDateEdited = dateEdited.toLocaleString('en-US', dateOptions)

    return (
        <Card>
            <CardImage src={item?.fileUrl} key={item?.id} onError={(e) => { e.target.src = noimage}}/>
            <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardPrice>
                    <PriceEUR>
                        {item.priceEUR}€
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
                    </CardAdmin>
                ) : ""}
            </CardBody>
        </Card>
    )
}

export default ProductCard
