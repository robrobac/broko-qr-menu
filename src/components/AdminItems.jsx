import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { db, storage } from '../firebase/config';
import { deleteObject, ref } from 'firebase/storage';
import ProductCard from './ProductCard';
import { CategoryItems } from './styledComponents/StyledCategory';

export const EditContext = createContext()

function AdminItems({category, getAllAdminItems, removeAdminItem, filteredItems, isSearch}) {
    const [items, setItems] = useState([]);
    const itemsLength = items.length - 1
    
    
    //  Fetching data from Firebase and storing all items in one array to handle search.
    //  useEffect works differently depending if filteredItems or Category is passed as a prop
    useEffect(() => {
        if (filteredItems) {
            setItems(filteredItems)
        } else if (category) {
            const q = query(collection (db, `${category.categoryPath}/items`), orderBy("orderTimestamp", "asc"));
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
        } else {
            setItems([])
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
                    console.log(error)
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
            console.error(error);
        }
    }


    //  Handling manual item ordering with buttons UP and DOWN
    const handleReorder = async (item, direction) => {

        //  Calculating a middle timestamp value in order to put moving item inbetween two compared timestamps.
        const getMiddleValue = (num1, num2) => {
            const sum = num1 + num2
            const number = sum / 2
            return number
        }
        //  Getting moving item index and firebase ref
        const itemIndex = items.findIndex(doc => doc.id === item.id )
        const docRef = doc(db, items[itemIndex].fullPath)

        //  If one item in array, do nothing.
        if (items.length <= 1) {
            return
        }

        //  Handling move UP
        if (direction === "up") {

            //  If moving item is first, don't move UP
            if (itemIndex === 0) {
                return
            }

            //  If moving item is second in array
            if (itemIndex === 1) {
                const prevOrder1 = items[1 - 1].orderTimestamp
                const middleValue = getMiddleValue(0, prevOrder1)
                //  Saving current scroll position to handle "scroll lock"
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

            //  If moving item is neither first nor second in array
            if (itemIndex >= 2) {
                const prevOrder1 = items[itemIndex - 1].orderTimestamp
                const prevOrder2 = items[itemIndex - 2].orderTimestamp
                const middleValue = getMiddleValue(prevOrder1, prevOrder2)
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

        //  Handling move DOWN
        } else if (direction === "down") {

            //  If moving item is last in the array
            if (itemIndex === itemsLength) {
                return
            }

            //  If moving item is second to last in the array
            if (itemIndex === itemsLength - 1) {
                const prevOrder1 = items[itemsLength].orderTimestamp
                const middleValue = prevOrder1 + 10
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

            //  If moving item is neither last nor second to last in the array
            else {
                const prevOrder1 = items[itemIndex + 1].orderTimestamp
                const prevOrder2 = items[itemIndex + 2].orderTimestamp
                const middleValue = getMiddleValue(prevOrder1, prevOrder2)
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <EditContext.Provider value={{
            handleEdit,
        }}>
        <CategoryItems>
            {items?.map((item, index) => (
                <ProductCard item={item} key={item.id} handleDelete={handleDelete} isAdmin={true} handleReorder={handleReorder} isSearch={isSearch} itemIndex={index} itemsLength={itemsLength}/>
            ))}
        </CategoryItems>
        </EditContext.Provider>
    )
}

export default AdminItems
