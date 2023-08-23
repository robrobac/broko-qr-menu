import React, { useEffect, useState } from 'react'
import Product from './Product';
import { CategoryItems } from './styledComponents/StyledCategory';

function CategoryProducts({ category }) {
    const categoryProductsLength = category.items.length - 1

    return (
        <CategoryItems>
            {category.items?.map((item, index) => (
                <Product key={item.id} item={item} itemIndex={index} categoryProductsLength={categoryProductsLength} />
            ))}
        </CategoryItems>
    )
}

export default CategoryProducts
