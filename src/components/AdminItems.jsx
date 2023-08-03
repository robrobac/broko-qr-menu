import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { db, storage } from '../firebase/config';
import { deleteObject, ref } from 'firebase/storage';
import ProductCard from './ProductCard';

export const EditContext2 = createContext()

function AdminItems({category}) {
    const [items, setItems] = useState([]);
    console.log(items)

    useEffect(() => {
            const q = query(collection(db, `${category.categoryPath}/items`));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const snapshotData = [];
                querySnapshot.forEach((doc) => {
                    snapshotData.push(doc.data());
                });
                setItems(snapshotData)
            });
            return () => {
                unsubscribe();
            }
    }, [])


    //  Handles delete for item passed as an argument from ItemCard component
    const handleDelete = async (item) => {
        //  Confirmation before proceeding
        if (window.confirm("Are you sure you want to delete this product?")) {
            //  If item contains image, delete it
            if (item.filePath !== "") {
                const fileRef = ref(storage, item.filePath)
                deleteObject(fileRef).then(() => {
                }).catch((error) => {
                    
                });
            }
            //  Delete item
            await deleteDoc(doc(db, item.fullPath));

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
            
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

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})

        } catch (error) {
            console.error("error creating a new item", error);
        }
    }


    return (
        <EditContext2.Provider value={{
            handleEdit,
        }}>
        <div>
            {items?.map((item) => (
                <ProductCard item={item} key={item.id} handleDelete={handleDelete} isAdmin={true}/>
            ))}
        </div>
        </EditContext2.Provider>
    )
}

export default AdminItems
