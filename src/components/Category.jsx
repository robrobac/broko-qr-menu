import { collection, query } from 'firebase/firestore'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../firebase/config'
import CategoryCard from './CategoryCard'



function Category({doc}) {
    const itemsQuery = query(collection(db, `menu/food/categories/${doc.category}/items`))
    const [docs, loading, error] = useCollectionData(itemsQuery)
    console.log(docs)

    return (
        <div>
        <h2>{doc.category}</h2>
        {docs?.map((item) => (
            <CategoryCard item={item} key={item.id}/>
        ))} 
        </div>
    )
}

export default Category
