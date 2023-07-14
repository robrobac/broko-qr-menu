import React, { useState } from 'react'
import ItemCard from '../../../components/ItemCard'
import { collection, deleteDoc, doc, query, updateDoc } from 'firebase/firestore'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db, storage } from '../../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'

function Items({category, categoriesPath}) {
    const [isEditing, setIsEditing] = useState(false)

    const itemsQuery = query(collection(db, `${categoriesPath}/${category.id}/items`))
    const [items] = useCollectionData(itemsQuery)

    //  Handles delete for item passed as an argument from ItemCard component
    const handleDelete = async (item) => {
        //  Confirmation before proceeding
        if (window.confirm("Are you sure you want to delete this product?")) {
            //  If item contains image, delete it
            if (item.filePath !== "") {
                const fileRef = ref(storage, item.filePath)
                deleteObject(fileRef).then(() => {
                    console.log("image deleted")
                }).catch((error) => {
                    
                });
            }
            //  Delete item
            await deleteDoc(doc(db, item.fullPath));
            console.log("item deleted")
        }
    }

        //  Handles edit for item passed as an argument from ItemCard component
        //  These functions should be put into context and sent over ItemCard component, not through it
    const handleEdit = async (itemObject, itemPath) => {
        try {
            //  Getting document ref from argument passed from ItemCard component
            const docRef = doc(db, itemPath)
            //  Update the item and close the form
            await updateDoc(docRef, itemObject)
            setIsEditing(false)
        } catch (error) {
            console.error("error creating a new item", error);
        }
    }

    return (
        <div>
            {items?.map((item) => (
                <ItemCard item={item} key={item.id} handleDelete={handleDelete} handleEdit={handleEdit} isEditing={isEditing} setIsEditing={setIsEditing}/>
            ))}
        </div>
    )
}

export default Items
