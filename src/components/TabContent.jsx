import React, { useEffect, useState } from 'react'
import "./TabContent.scss"
import { Element } from 'react-scroll'
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/config'
import { DeleteButton } from './StyledButtons'
import EditCategoryModal from './EditCategoryModal'
import { deleteObject, ref } from 'firebase/storage'
import AdminItems from './AdminItems'
import ProductCard from './ProductCard'

function TabContent({selectedTab, homeMenuData, isAdmin, isDrink}) {
    const [categories, setCategories] = useState([])
    console.log(categories)

    useEffect(() => {
        if (homeMenuData && selectedTab) {
            setCategories(homeMenuData[selectedTab])
        }
    }, [selectedTab, homeMenuData])

    useEffect(() => {
        if (!homeMenuData) {
            const categoriesPath = isDrink ? "menu/drink/categories" : "menu/food/categories"
            const q = query(collection(db, categoriesPath));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const snapshotData = [];
                querySnapshot.forEach((doc) => {
                    snapshotData.push(doc.data());
                });
                setCategories(snapshotData)
            });
            return () => {
                unsubscribe();
            }
        }
    }, [])


    //  Handles delete of whole category
    const handleDeleteCategory = async (category) => {
        //  Confirmation before proceeding
        if (window.confirm("Deleting category will delete all its items, are you sure you want to proceed?")) {
            
            //  Get category subcollections items in order to delete them since Firebase doesn't delete subcollections
            const categoryItemsPath = `${category.categoryPath}/items`
            const categoryItemsQuery = query(collection(db, categoryItemsPath))
            const categoryItems = await getDocs(categoryItemsQuery)
            
            if (categoryItems) {
                //  If there's categoryItems 
                categoryItems.forEach(async (item) => {
                    //  For each item check if filePath have value, if yes then delete file on that path and then delete the item from the collection
                    if (item.data().filePath !== "") {
                        //  Get the file reference
                        const fileRef = ref(storage, item.data().filePath)
                        //  Delete file from the storage
                        await deleteObject(fileRef).then(() => {
                        }).catch((error) => {

                        });
                    }
                    //  After and if the file is deleted from the storage, remove the item from the collection
                    await deleteDoc(doc(db, item.data().fullPath))
                })
            }
            //  Delete the category item from the collection
            await deleteDoc(doc(db, category.categoryPath));

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
        }
    }


    return (
        <div>
            {categories?.map((category) => (
                <Element key={category.id} name={category.id} className='categoryContainer'>
                    <h2 className="categoryTitle" id={category.id}>{category.category}</h2>
                    {isAdmin ? (
                        <>
                        <div className='categoryControls'>
                            <DeleteButton onClick={() => handleDeleteCategory(category)}>Delete Category</DeleteButton>
                            <EditCategoryModal category={category} />
                        </div>
                        <AdminItems category={category}/>
                        </>
                    ) : 
                        <div>
                            {category.items?.map((item) => (
                                <>
                                <ProductCard item={item} key={item.id}/>
                                </>
                            ))}
                        </div>
                    }
                </Element>
            ))}
        </div>
    )
}

export default TabContent
