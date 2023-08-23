import React from 'react'
import { AdminButtons, AdminTimestamp, Card, CardAdmin, CardBody, CardDesc, CardImage, CardPrice, CardTitle, List, ListAdmin, ListBody, ListDesc, ListHeader, ListPrice, ListTitle, PriceEUR, PriceEURlist, PriceKN, PriceKNlist, TruncateDots, TruncateWrap } from './styledComponents/StyledCard'
import noimage from "../noimage.png"
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";
import { ReactComponent as UpIcon } from "../icons/upicon.svg";
import { ReactComponent as DownIcon } from "../icons/downicon.svg";
import { handleTranslate } from '../helpers/handleTranslate';
import { useTranslation } from 'react-i18next';
import { DeleteButton, UpDownButton } from './styledComponents/StyledButtons';
import EditItemModal from './modals/editItemModal/EditItemModal'

function Product({ item, itemIndex, categoryProductsLength }) {
    const { t, i18n } = useTranslation()

    const handleDeleteProduct = (category) => {
        console.log("Delete Product", category.category)
    }

    const handleReorderProduct = (category, direction) => {
        console.log("Move Product", direction)
    }

    const handleLoading = (isLoading) => {
        console.log("loading", isLoading)
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

    return (
        <Card>
            <CardImage src={item?.fileUrl} key={item?.id} onError={(e) => { e.target.src = noimage}} onLoad={() => handleLoading(false)}/>
            <CardBody>
                <CardTitle>
                    {handleTranslate(item.titleEng, i18n) ? item.titleEng : item.title}
                </CardTitle>
                <TruncateWrap>
                    <CardDesc>
                        {handleTranslate(item.descriptionEng, i18n) ? item.descriptionEng : item.description}
                    </CardDesc>
                </TruncateWrap>
                <CardPrice>
                    <PriceEUR>
                        {typeof item.priceEUR === 'number'
                            ? item.priceEUR.toFixed(2) + '€'
                            : item.priceEUR}
                        <PriceKN>({item.priceKN}kn)</PriceKN>
                    </PriceEUR>
                </CardPrice>
                <CardAdmin>
                    <AdminButtons>
                        <DeleteButton onClick={() => handleDeleteProduct(item)}>
                            <TrashIcon height="100%"/>
                        </DeleteButton>
                        <EditItemModal item={item}/>
                    </AdminButtons>
                    <AdminButtons>
                        <UpDownButton $isActive={itemIndex === 0 ? "true" : undefined}>
                            <UpIcon height="100%" onClick={() => handleReorderProduct(item, "up")}/>
                        </UpDownButton>
                        <UpDownButton $isActive={itemIndex === categoryProductsLength ? "true" : undefined}>
                            <DownIcon height="100%" onClick={() => handleReorderProduct(item, "down")}/>
                        </UpDownButton>
                    </AdminButtons>
                </CardAdmin>
                <CardAdmin>
                    <AdminButtons>
                        <AdminTimestamp>{t("Published")} {formattedDateCreated}</AdminTimestamp>
                        <AdminTimestamp>{t("Edited")}  {formattedDateEdited}</AdminTimestamp>
                    </AdminButtons>
                </CardAdmin>
            </CardBody>
        </Card>
    )
}

export default Product
