import React, { useContext } from 'react'
import { AuthContext } from '../../../App'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'

function DeleteItemButton({item}) {

    const {isAuth} = useContext(AuthContext)

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            if (item.filePath !== "") {
                const fileRef = ref(storage, item.filePath)
                
                deleteObject(fileRef).then(() => {
                    console.log("image deleted")
                }).catch((error) => {
                    
                });
            }
            await deleteDoc(doc(db, item.fullPath));
            console.log("item deleted")
        }
    }

    if(isAuth) {
        return (
            <button type="button" className="btn btn-danger btn-sm" onClick={handleDelete}>
                Delete
            </button>
        )
    }
  
}

export default DeleteItemButton
