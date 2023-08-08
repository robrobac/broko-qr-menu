import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { db, storage } from '../firebase/config';
import { deleteObject, ref } from 'firebase/storage';
import ProductCard from './ProductCard';

export const EditContext = createContext()

function AdminItems({category, getAllAdminItems, removeAdminItem, filteredItems}) {
    const [items, setItems] = useState([]);
    
    //  Fetching data from Firebase and storing all items in one array to handle search.
    //  useEffect works differently depending if filteredItems or Category is passed as a prop
    useEffect(() => {
        if (filteredItems) {
            setItems(filteredItems)
        } else if (category) {
            const q = query(collection(db, `${category.categoryPath}/items`));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const snapshotData = [];
                querySnapshot.forEach((doc) => {
                    //  On each loop push current Item data to snapshotData array.
                    snapshotData.push(doc.data());
                    getAllAdminItems(doc.data())    //  Sends data to CategoryTabs.jsx to use in search bar
                });
                //  Put snapshotData array into Items state
                setItems(snapshotData)
                
            });
            return () => {
                unsubscribe();
            }
        }
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, filteredItems])




    //  Handles delete for item passed as an argument from ProductCard.jsx.
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
            removeAdminItem(item); //  Removes data from CategoryTabs.jsx to remove it from search bar
            await deleteDoc(doc(db, item.fullPath));

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
            
        }
    }

        //  Handles edit for item passed as an argument from ProductCard.jsx
    const handleEdit = async (itemObject, itemPath) => {
        try {
            //  Getting document ref from argument passed from ProductCard.jsx
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
        <EditContext.Provider value={{
            handleEdit,
        }}>
        <div>
            {items?.map((item) => (
                <ProductCard item={item} key={item.id} handleDelete={handleDelete} isAdmin={true}/>
            ))}
        </div>
        </EditContext.Provider>
    )
}

export default AdminItems
