import React, { memo } from 'react'
import { Element } from 'react-scroll'
import { CategoryContainer, CategoryControls,  CategoryTitle } from './styledComponents/StyledCategory'
import { handleTranslate } from '../helpers/handleTranslate'
import { useTranslation } from 'react-i18next'
import EditCategoryModal from './modals/EditCategoryModal'
import CategoryProducts from './CategoryProducts'
import DeleteCategory from './DeleteCategory'
import ReorderCategory from './ReorderCategory'
import LazyLoad from 'react-lazy-load'

const Category = memo(function Category({category, categoryIndex, menuData, isAdmin}) {
    const { i18n } = useTranslation()

    return (
        
        <CategoryContainer key={category.id}>
                <Element key={category.id} name={category.id}>
                    <CategoryTitle id={category.id}>
                        {handleTranslate(category.categoryEng, i18n) ? category.categoryEng : category.category}
                    </CategoryTitle>
                    {isAdmin && 
                    <LazyLoad height={36}>
                        <CategoryControls >
                            <DeleteCategory category={category} />
                            <EditCategoryModal category={category} />
                            <ReorderCategory category={category} categoryIndex={categoryIndex} tab={menuData}/>
                        </CategoryControls>
                    </LazyLoad>
                    }
                    
                    <CategoryProducts isAdmin={isAdmin} category={category} />
                </Element>
        </CategoryContainer>
        
    )
})

export default Category
