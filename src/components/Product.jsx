import React, { memo, useContext } from 'react'
import { AdminButtons, AdminTimestamp, Card, CardAdmin, CardBody, CardDesc, CardImage, CardPrice, CardTitle, List, ListBody, ListDesc, ListHeader, ListPrice, ListTitle, PriceEUR, PriceEURlist, PriceKN, PriceKNlist, TruncateWrap } from './styledComponents/StyledCard'
import noimage from "../noimage.png"
import { handleTranslate } from '../helpers/handleTranslate';
import { useTranslation } from 'react-i18next';
import EditItemModal from './modals/editItemModal/EditItemModal'

import DeleteProduct from './DeleteProduct';
import ReorderProduct from './ReorderProduct';
import { AppContext } from '../App';
import LazyLoad from 'react-lazy-load';
import { Reveal } from '../helpers/Reveal';

const Product = memo(function Product({item, itemIndex, category, isSearch, isAdmin}) {
    const {handleLoading} = useContext(AppContext)
    const { t, i18n } = useTranslation()
    
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

    if (item.mainCategory === "drink") {
        return (
            <Reveal>
            <List id='list'>
                <ListBody id='listBody'>
                    <ListHeader id='listHeader'>
                        <ListTitle id='listTitle'>
                            {handleTranslate(item.titleEng, i18n) ? item.titleEng : item.title}
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
                        {handleTranslate(item.descriptionEng, i18n) ? item.descriptionEng : item.description}
                    </ListDesc>
                    
                    {isAdmin && <LazyLoad height={61}><div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                        <CardAdmin>
                            <AdminButtons>
                                <DeleteProduct item={item}/>
                                <EditItemModal item={item}/>
                            </AdminButtons>
                            {!isSearch && <ReorderProduct item={item} itemIndex={itemIndex} category={category}/> }
                            
                        </CardAdmin>
                        <CardAdmin>
                            <AdminButtons>
                                <AdminTimestamp>{t("Published")}  {formattedDateCreated}</AdminTimestamp>
                                <AdminTimestamp>{t("Edited")}  {formattedDateEdited}</AdminTimestamp>
                            </AdminButtons>
                        </CardAdmin>
                    </div></LazyLoad>}
                    
                </ListBody>
            </List>
            </Reveal>
        )
    } else  {
        return (
            <Reveal>
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
                    
                    {isAdmin && <LazyLoad height={61}><div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                        <CardAdmin>
                            <AdminButtons>
                                <DeleteProduct item={item}/>
                                <EditItemModal item={item}/>
                            </AdminButtons>
                            {!isSearch && <ReorderProduct item={item} itemIndex={itemIndex} category={category}/> }
                            
                        </CardAdmin>
                        <CardAdmin>
                            <AdminButtons>
                                <AdminTimestamp>{t("Published")} {formattedDateCreated}</AdminTimestamp>
                                <AdminTimestamp>{t("Edited")}  {formattedDateEdited}</AdminTimestamp>
                            </AdminButtons>
                        </CardAdmin>
                    </div></LazyLoad> }
                    
                </CardBody>
            </Card>
            </Reveal>
        )
    }

    
})

export default Product
