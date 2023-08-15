import React, { useContext } from 'react'
import { AdminButtons, AdminTimestamp, Card, CardAdmin, CardBody, CardDesc, CardImage, CardPrice, CardTitle, List, ListAdmin, ListBody, ListDesc, ListHeader, ListPrice, ListTitle, PriceEUR, PriceEURlist, PriceKN, PriceKNlist } from './styledComponents/StyledCard'
import { DeleteButton, UpDownButton } from './styledComponents/StyledButtons'
import noimage from "../noimage.png"
import EditItemModal from './modals/editItemModal/EditItemModal'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";
import { ReactComponent as UpIcon } from "../icons/upicon.svg";
import { ReactComponent as DownIcon } from "../icons/downicon.svg";
import { AppContext } from '../App';

function ProductCard({item, handleDelete, isAdmin, handleReorder, isSearch, itemIndex, itemsLength, viewStyle}) {
    const { handleLoading } = useContext(AppContext)

    if (viewStyle === "list") {
        handleLoading(false)
    }
    
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

    if (viewStyle === "card") {
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
                        <>
                        <CardAdmin>
                            <AdminButtons>
                                <DeleteButton onClick={() => handleDelete(item)}>
                                    <TrashIcon height="100%"/>
                                </DeleteButton>
                                <EditItemModal item={item}/>
                            </AdminButtons>
                            {!isSearch ? (
                                <AdminButtons>
                                    <UpDownButton $isActive={itemIndex === 0 ? "true" : undefined}>
                                        <UpIcon height="100%" onClick={() => handleReorder(item, "up")}/>
                                    </UpDownButton>
                                    <UpDownButton $isActive={itemIndex === itemsLength ? "true" : undefined}>
                                        <DownIcon height="100%" onClick={() => handleReorder(item, "down")}/>
                                    </UpDownButton>
                                </AdminButtons>
                            ) : ""} 
                        </CardAdmin>
                        <CardAdmin>
                            <AdminButtons>
                                <AdminTimestamp>Created: {formattedDateCreated}</AdminTimestamp>
                                <AdminTimestamp>Edited: {formattedDateEdited}</AdminTimestamp>
                            </AdminButtons>
                        </CardAdmin>
                        </>
                    ) : ""}
                </CardBody>
            </Card>
        )
    }

    if (viewStyle === "list") {
        return (
            <List id='list'>
                <ListBody id='listBody'>
                    <ListHeader id='listHeader'>
                        <ListTitle id='listTitle'>{item.title}</ListTitle>
                        <ListPrice id='listPrice'>
                            <PriceEURlist id='priceEurList'>
                                {typeof item.priceEUR === 'number'
                                    ? item.priceEUR.toFixed(2) + '€'
                                    : item.priceEUR}
                                    <PriceKNlist id='priceKnList'>({item.priceKN}kn)</PriceKNlist>
                            </PriceEURlist>
                        </ListPrice>
                    </ListHeader>
                    <ListDesc>{item.description}</ListDesc>
                    {isAdmin ? (
                        <>
                        <ListAdmin>
                            <AdminButtons>
                                <DeleteButton onClick={() => handleDelete(item)}>
                                    <TrashIcon height="100%"/>
                                </DeleteButton>
                                <EditItemModal item={item}/>
                            </AdminButtons>
                            {!isSearch ? (
                                <AdminButtons>
                                    <UpDownButton $isActive={itemIndex === 0 ? "true" : undefined}>
                                        <UpIcon height="100%" onClick={() => handleReorder(item, "up")}/>
                                    </UpDownButton>
                                    <UpDownButton $isActive={itemIndex === itemsLength ? "true" : undefined}>
                                        <DownIcon height="100%" onClick={() => handleReorder(item, "down")}/>
                                    </UpDownButton>
                                </AdminButtons>
                            ) : ""} 
                        </ListAdmin>
                        <CardAdmin>
                            <AdminButtons>
                                <AdminTimestamp>Created: {formattedDateCreated}</AdminTimestamp>
                                <AdminTimestamp>Edited: {formattedDateEdited}</AdminTimestamp>
                            </AdminButtons>
                        </CardAdmin>
                        </>
                    ) : ""}
                </ListBody>
                
            </List>
        )
    }

    
}

export default ProductCard
