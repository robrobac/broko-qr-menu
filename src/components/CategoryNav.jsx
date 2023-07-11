import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import "./CategoryNav.scss"

import { MenuContext } from '../App';

import Stack from 'react-bootstrap/Stack';

function CategoryNav({category}) {
    const { foodCategoriesAndItems, drinkCategoriesAndItems } = useContext(MenuContext)

    if (category === "drink") {
        return (
            <ul className='categoryNav sticky-top'>
            <Stack gap={2} direction='horizontal'>
                {drinkCategoriesAndItems.map((category) => (
                    <Button variant="outline-primary" style={{ whiteSpace: 'nowrap' }}>{category.category}</Button>
                ))}
            </Stack>
        </ul>
        )
    } else if (category === "food") {
        return (
            <ul className='categoryNav sticky-top'>
                <Stack gap={2} direction='horizontal'>
                    {foodCategoriesAndItems.map((category) => (
                        <Button variant="outline-primary" style={{ whiteSpace: 'nowrap' }}>{category.category}</Button>
                    ))}
                </Stack>
            </ul>
        )
    }

    
}

export default CategoryNav
