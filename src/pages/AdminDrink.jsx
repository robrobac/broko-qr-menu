import React from 'react'
import { Stack } from 'react-bootstrap'
import { Element } from 'react-scroll';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import AdminDrinkItem from './AdminDrinkItem';

function AdminDrink() {
    const drinkCategoriesPath = "menu/drink/categories";
    const drinkCategoriesQuery = query(collection(db, drinkCategoriesPath));
    const [drinkCategories] = useCollectionData(drinkCategoriesQuery);

    return (
        <div>
            <Stack gap={3}>
            {drinkCategories?.map((category) => (
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
