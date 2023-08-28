import React, { memo, useContext } from 'react'
import { Element } from 'react-scroll'
import { CategoryContainer, CategoryControls,  CategoryTitle } from './styledComponents/StyledCategory'
import { handleTranslate } from '../helpers/handleTranslate'
import { useTranslation } from 'react-i18next'
import EditCategoryModal from './modals/EditCategoryModal'
import CategoryProducts from './CategoryProducts'
import { AdminContext } from './MainTabs'
import DeleteCategory from './DeleteCategory'
import ReorderCategory from './ReorderCategory'
import { useAuthCheck } from '../hooks/useAuth'


const Category = memo(function Category({category, categoryIndex, menuData}) {
    const { i18n } = useTranslation()

    return (
        <CategoryContainer key={category.id}>
                <Element key={category.id} name={category.id}>
                    <CategoryTitle id={category.id}>
                        {handleTranslate(category.categoryEng, i18n) ? category.categoryEng : category.category}
                    </CategoryTitle>
                    {useAuthCheck() && 
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
})

export default Category
