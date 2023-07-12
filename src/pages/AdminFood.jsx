import React, { useContext } from 'react'
import { MenuContext } from '../App';
import { Stack } from 'react-bootstrap'
import ItemCard from '../components/ItemCard';
import { Element } from 'react-scroll';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import AdminFoodItem from './AdminFoodItem';

function AdminFood() {
    const foodCategoriesPath = "menu/food/categories";
    const foodCategoriesQuery = query(collection(db, foodCategoriesPath));
    const [foodCategories] = useCollectionData(foodCategoriesQuery);

    return (
        <div>
            <Stack gap={3}>
            {foodCategories?.map((category) => (
                <Element key={category.id} name={category.id}>
                    <Stack gap={3} key={category.id}>
                        <h2 className="text-center" id={category.id}>{category.category}</h2>
                        <AdminFoodItem category={category} foodCategoriesPath={foodCategoriesPath}/>
                    </Stack>
                </Element>
            ))}
            </Stack>
        </div>
    )
}

export default AdminFood
