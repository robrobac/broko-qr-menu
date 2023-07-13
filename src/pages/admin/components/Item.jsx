import React from 'react'
import ItemCard from '../../../components/ItemCard'
import { collection, query } from 'firebase/firestore'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../../firebase/config'

function Item({category, categoriesPath}) {
    const itemsQuery = query(collection(db, `${categoriesPath}/${category.id}/items`))
    const [items] = useCollectionData(itemsQuery)

    return (
        <div>
            {items?.map((item) => (
                <ItemCard item={item} key={item.id}/>
            ))}
        </div>
    )
}

export default Item
