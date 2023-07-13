import React from 'react'
import { Stack } from 'react-bootstrap'
import { Element } from 'react-scroll';
import AdminDrinkItem from './AdminDrinkItem';

function AdminDrink({categories}) {
    const drinkCategoriesPath = "menu/drink/categories";

    return (
        <div>
            <Stack gap={3}>
            {categories?.map((category) => (
                <Element key={category.id} name={category.id}>
                    <Stack gap={3} key={category.id}>
                        <h2 className="text-center" id={category.id}>{category.category}</h2>
                        <AdminDrinkItem category={category} drinkCategoriesPath={drinkCategoriesPath}/>
                    </Stack>
                </Element>
            ))}
            </Stack>
        </div>
    )
}

export default AdminDrink
