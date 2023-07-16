import React from 'react'
import { Element } from 'react-scroll';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, storage } from '../../../firebase/config';
import Items from './Items';
import { deleteObject, ref } from 'firebase/storage';
import EditCategoryModal from './EditCategoryModal';

function Categories({isDrink}) {
    const categoriesPath = isDrink ? "menu/drink/categories" : "menu/food/categories"
    const categoriesQuery = query(collection(db, categoriesPath))
    const [categories] = useCollectionData(categoriesQuery)

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
            const items = categoryItems.docs
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
    }
}

    return (
        <div>
            {categories?.map((category) => (
                <Element key={category.id} name={category.id}>
                        <h2 className="text-center" id={category.id}>{category.category}</h2>
                        <button onClick={() => handleDeleteCategory(category)}>Delete category</button>
                        <EditCategoryModal category={category} />
                        <Items category={category} categoriesPath={categoriesPath}/>
                </Element>
            ))}
        </div>
    )
}

export default Categories
