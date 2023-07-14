import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../App'
import { Modal } from 'react-bootstrap'
import EditItemForm from './EditItemForm'

function EditItemButton({item}) {
    const {isAuth} = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)

    // const handleDelete = async () => {
    //     if (window.confirm("Are you sure you want to delete this product?")) {
    //         if (item.filePath !== "") {
    //             const fileRef = ref(storage, item.filePath)
                
    //             deleteObject(fileRef).then(() => {
    //                 console.log("image deleted")
    //             }).catch((error) => {
                    
    //             });
    //         }
    //         await deleteDoc(doc(db, item.fullPath));
    //         console.log("item deleted")
    //     }
    // }

    if(isAuth) {
        return (
            <div>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                    EDIT
                </button>
            <Modal show={isEditing} onHide={() => setIsEditing(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Drink</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditItemForm item={item} handleClose={setIsEditing}/>
                </Modal.Body>
            </Modal>
        </div>
        )
    }

}

export default EditItemButton
