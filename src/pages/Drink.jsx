import React, { useContext } from 'react'
import { MenuContext } from '../App';
import { Stack } from 'react-bootstrap'
import ItemCard from '../components/ItemCard';
import { Element } from 'react-scroll';

function Drink() {
    const { drinkCategoriesAndItems } = useContext(MenuContext)
    return (
        <div>
            <Stack gap={3}>
            {drinkCategoriesAndItems?.map((category) => (
                <Element key={category.id} name={category.id}>
                    <Stack gap={3} key={category.id}>
                        <h2 className="text-center" id={category.id}>{category.category}</h2>
                        {category.items?.map((item) => (
                            <ItemCard item={item} key={item.id}/>
                        ))}
                    </Stack>
                </Element>
            ))}
            </Stack>
        </div>
    )
}

export default Drink
