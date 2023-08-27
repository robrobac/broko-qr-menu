import React from 'react'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";
import { DeleteButton } from './styledComponents/StyledButtons';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { t } from 'i18next';

function DeleteProduct({item}) {

      //  Handles delete for item passed as an argument from ProductCard.jsx.
      const handleDeleteProduct = async (item) => {
        //  Confirmation before proceeding
        if (window.confirm(t("Item Delete Confirmation"))) {
            //  If item contains image, delete it
            if (item.filePath !== "") {
                const fileRef = ref(storage, item.filePath)
                deleteObject(fileRef).then(() => {
                }).catch((error) => {
                    console.log(error)
                });
            }
            //  Delete item
            await deleteDoc(doc(db, item.fullPath));

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
        }
    }

    return (
        <DeleteButton onClick={() => handleDeleteProduct(item)}>
            <TrashIcon height="100%"/>
        </DeleteButton>
    )
}

export default DeleteProduct
