import React from 'react'
import { Element } from 'react-scroll';
import { collection, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase/config';
import Items from './Items';

function DrinkCategories() {
    const drinkCategoriesPath = "menu/drink/categories";
    const drinkCategoriesQuery = query(collection(db, drinkCategoriesPath));
    const [drinkCategories] = useCollectionData(drinkCategoriesQuery);

    return (
        <div>
            {drinkCategories?.map((category) => (
                <Element key={category.id} name={category.id}>
                        <h2 className="text-center" id={category.id}>{category.category}</h2>
                        <Items category={category} categoriesPath={drinkCategoriesPath}/>
                </Element>
            ))}

        </div>
    )
}

export default DrinkCategories