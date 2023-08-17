import React, { useContext, useEffect, useState } from 'react'
import { AdminButtons, AdminTimestamp, Card, CardAdmin, CardBody, CardDesc, CardImage, CardPrice, CardTitle, List, ListAdmin, ListBody, ListDesc, ListHeader, ListPrice, ListTitle, PriceEUR, PriceEURlist, PriceKN, PriceKNlist, TruncateDots, TruncateWrap } from './styledComponents/StyledCard'
import { DeleteButton, UpDownButton } from './styledComponents/StyledButtons'
import noimage from "../noimage.png"
import EditItemModal from './modals/editItemModal/EditItemModal'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";
import { ReactComponent as UpIcon } from "../icons/upicon.svg";
import { ReactComponent as DownIcon } from "../icons/downicon.svg";
import { AppContext } from '../App';
import { useTranslation } from 'react-i18next'
import { handleTranslate } from '../helpers/handleTranslate'

function ProductCard({item, handleDelete, isAdmin, handleReorder, isSearch, itemIndex, itemsLength, viewStyle}) {
    const { handleLoading } = useContext(AppContext)
    const [truncateDesc, setTruncateDesc] = useState(!isAdmin)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (viewStyle === "list") {
            handleLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
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
                    <CardTitle>
                        {handleTranslate(item.titleEng, i18n) ? item.titleEng : item.title}
                    </CardTitle>
                    <TruncateWrap onClick={() => setTruncateDesc(!truncateDesc)}>
                        <CardDesc $truncate={truncateDesc ? "true" : undefined}>
                            {handleTranslate(item.descriptionEng, i18n) ? item.descriptionEng : item.description}
                        </CardDesc>
                        {truncateDesc ? <TruncateDots>...</TruncateDots> : ""}
                    </TruncateWrap>
                    <CardPrice>
                        <PriceEUR>
                            {typeof item.priceEUR === 'number'
                                ? item.priceEUR.toFixed(2) + '€'
                                : item.priceEUR}
                            <PriceKN>({item.priceKN}kn)</PriceKN>
                        </PriceEUR>
                    </CardPrice>
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
                                <AdminTimestamp>{t("Published")} {formattedDateCreated}</AdminTimestamp>
                                <AdminTimestamp>{t("Edited")}  {formattedDateEdited}</AdminTimestamp>
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
                        <ListTitle id='listTitle'>
                            {handleTranslate(item.titleEng) ? item.titleEng : item.title}
                        </ListTitle>
                        <ListPrice id='listPrice'>
                            <PriceEURlist id='priceEurList'>
                                {typeof item.priceEUR === 'number'
                                    ? item.priceEUR.toFixed(2) + '€'
                                    : item.priceEUR}
                                    <PriceKNlist id='priceKnList'>({item.priceKN}kn)</PriceKNlist>
                            </PriceEURlist>
                        </ListPrice>
                    </ListHeader>
                    <ListDesc>
                        {handleTranslate(item.descriptionEng) ? item.descriptionEng : item.description}
                    </ListDesc>
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
                                <AdminTimestamp>{t("Published")}  {formattedDateCreated}</AdminTimestamp>
                                <AdminTimestamp>{t("Edited")}  {formattedDateEdited}</AdminTimestamp>
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
