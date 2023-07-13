import React from 'react'
import { Element } from 'react-scroll';
import AdminFoodItem from './AdminFoodItem';

function AdminFood({categories}) {
    const foodCategoriesPath = "menu/food/categories";

    return (
        <div>
            {categories?.map((category) => (
                <Element key={category.id} name={category.id}>
                        <h2 className="text-center" id={category.id}>{category.category}</h2>
                        <AdminFoodItem category={category} foodCategoriesPath={foodCategoriesPath}/>
                </Element>
            ))}
        </div>
    )
}

export default AdminFood
