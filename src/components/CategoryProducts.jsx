import React from 'react'
import Product from './Product';
import { CategoryItems } from './styledComponents/StyledCategory';


function CategoryProducts({ category, isAdmin }) {

    return (
        <CategoryItems>
            {category.items?.map((item, index) => (
                <Product isAdmin={isAdmin} key={item.id} item={item} itemIndex={index} category={category}/>
            ))}
        </CategoryItems>
    )
}

export default CategoryProducts
