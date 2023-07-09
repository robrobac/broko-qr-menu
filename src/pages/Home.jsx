import React from 'react'
import Logout from '../components/Logout'
import { collection, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../firebase/config'
import Category from '../components/Category'

function Home() {
    const categoriesQuery = query(collection(db, "menu/food/categories"))
    const [docs, loading, error] = useCollectionData(categoriesQuery)

    return (
        <div>
            <h1>Broko Menu</h1>
            <Logout />

            {docs?.map((doc) => (
                <Category doc={doc} key={doc.id}/>
            ))}
        </div>
    )
}

export default Home
