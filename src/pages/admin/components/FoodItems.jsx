import React from 'react'
import { Element } from 'react-scroll';
import { collection, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase/config';
import Item from './Item';

function FoodItems() {
    const foodCategoriesPath = "menu/food/categories";
    const foodCategoriesQuery = query(collection(db, foodCategoriesPath));
    const [foodCategories] = useCollectionData(foodCategoriesQuery);

    return (
        <div>
            {foodCategories?.map((category) => (
                <Element key={category.id} name={category.id}>
                        <h2 className="text-center" id={category.id}>{category.category}</h2>
                        <Item category={category} categoriesPath={foodCategoriesPath}/>
                </Element>
            ))}
        </div>
    )
}

export default FoodItems
