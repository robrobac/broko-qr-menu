import React from 'react'
import { Element } from 'react-scroll'
import { CategoryContainer, CategoryControls, CategoryItems, CategoryTitle } from './styledComponents/StyledCategory'
import { DeleteButton, UpDownButton, ViewButton, ViewContainer } from './styledComponents/StyledButtons'
import { handleTranslate } from '../helpers/handleTranslate'
import { useTranslation } from 'react-i18next'
import EditCategoryModal from './modals/EditCategoryModal'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";
import { ReactComponent as UpIcon } from "../icons/upicon.svg";
import { ReactComponent as DownIcon } from "../icons/downicon.svg";
import CategoryProducts from './CategoryProducts'

function Category({ category, categoryIndex, categoriesLength }) {
    const { i18n } = useTranslation()


    const handleDeleteCategory = (category) => {
        console.log("Delete Category", category.category)
    }

    const handleReorderCategory = (category, direction) => {
        console.log("Move Category", direction)
    }

    return (
        <CategoryContainer key={category.id}>
                <Element key={category.id} name={category.id}>
                    <CategoryTitle id={category.id}>
                        {handleTranslate(category.categoryEng, i18n) ? category.categoryEng : category.category}
                    </CategoryTitle>
                    <CategoryControls>
                        <DeleteButton onClick={() => handleDeleteCategory(category)}>
                            <TrashIcon height="100%"/>
                        </DeleteButton>
                        <EditCategoryModal category={category} />
                        <UpDownButton $isActive={categoryIndex === 0 ? "true" : undefined}>
                            <UpIcon height="100%" onClick={() => handleReorderCategory(category, "up")}/>
                        </UpDownButton>
                        <UpDownButton $isActive={categoryIndex === categoriesLength ? "true" : undefined}>
                            <DownIcon height="100%" onClick={() => handleReorderCategory(category, "down")}/>
                        </UpDownButton>
                    </CategoryControls>
                    <CategoryProducts category={category} />
                </Element>
        </CategoryContainer>
    )
}

export default Category
