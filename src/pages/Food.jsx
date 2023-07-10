import React, { useContext } from 'react'

import { MenuContext } from '../App';

import { Stack } from 'react-bootstrap'

import ItemCard from '../components/ItemCard';

function Food() {
    const { foodCategoriesAndItems } = useContext(MenuContext)
    return (
        <div>
            <Stack gap={3}>
            {foodCategoriesAndItems?.map((category) => (
                <Stack gap={3} key={category.id}>
                    <h2 className="text-center">{category.category}</h2>
                    {category.items?.map((item) => (
                        <ItemCard item={item} key={item.id}/>
                    ))}
                </Stack>
                
            ))}
            </Stack>
        </div>
    )
}

export default Food