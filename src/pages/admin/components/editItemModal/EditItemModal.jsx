import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditItemModalForm from './EditItemModalForm'

function EditItemModal({item}) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div>
            <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEditing(true)}>
            EDIT
            </button>
            <Modal show={isEditing} onHide={() => setIsEditing(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Drink</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditItemModalForm item={item} setIsEditing={setIsEditing}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditItemModal
