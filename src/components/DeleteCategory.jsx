import { collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { t } from 'i18next'
import React from 'react'
import { db, storage } from '../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { DeleteButton } from './styledComponents/StyledButtons'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";

function DeleteCategory({category}) {

    //  Handles delete of whole category
    const handleDeleteCategory = async (category) => {
        //  Confirmation before proceeding
        if (window.confirm(t("Category Delete Confirmation"))) {
            
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
                            console.log(error)
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
        <DeleteButton onClick={() => handleDeleteCategory(category)}>
            <TrashIcon height="100%"/>
        </DeleteButton>
    )
}

export default DeleteCategory
