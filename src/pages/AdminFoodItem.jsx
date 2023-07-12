import React from 'react'
import ItemCard from '../components/ItemCard'
import { collection, query } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function AdminDrinkItem({category, foodCategoriesPath}) {
    const categoryItemsQuery = query(collection(db, `${foodCategoriesPath}/${category.id}/items`))
    const [categoryItems] = useCollectionData(categoryItemsQuery)

    return (
        <div>
            {categoryItems?.map((item) => (
                <ItemCard item={item} key={item.id}/>
            ))}
        </div>
    )
}

export default AdminDrinkItem
