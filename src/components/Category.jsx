import React, { useContext, useEffect, useState } from 'react'
import { Element } from 'react-scroll'
import { CategoryContainer, CategoryControls, CategoryItems, CategoryTitle } from './styledComponents/StyledCategory'
import { DeleteButton, UpDownButton, ViewButton, ViewContainer } from './styledComponents/StyledButtons'
import { handleTranslate } from '../helpers/handleTranslate'
import { useTranslation } from 'react-i18next'
import EditCategoryModal from './modals/EditCategoryModal'

import { ReactComponent as UpIcon } from "../icons/upicon.svg";
import { ReactComponent as DownIcon } from "../icons/downicon.svg";
import CategoryProducts from './CategoryProducts'
import { AdminContext } from './MainTabs'
import DeleteCategory from './DeleteCategory'
import ReorderProduct from './ReorderProduct'
import ReorderCategory from './ReorderCategory'


function Category({ category, categoryIndex, menuData }) {
    const { isAdmin } = useContext(AdminContext)
    const { i18n } = useTranslation()

    return (
        <CategoryContainer key={category.id}>
                <Element key={category.id} name={category.id}>
                    <CategoryTitle id={category.id}>
                        {handleTranslate(category.categoryEng, i18n) ? category.categoryEng : category.category}
                    </CategoryTitle>
                    {isAdmin && 
                        <CategoryControls >
                            <DeleteCategory category={category} />
                            <EditCategoryModal category={category} />
                            <ReorderCategory category={category} categoryIndex={categoryIndex} tab={menuData}/>
                        </CategoryControls>
                    }
                    <CategoryProducts category={category} />
                </Element>
        </CategoryContainer>
    )
}

export default Category
