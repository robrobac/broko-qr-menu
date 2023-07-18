import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditItemModalForm from './EditItemModalForm'
import { EditButton } from '../../../../components/StyledButtons'

function EditItemModal({item}) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div>
            <EditButton onClick={() => setIsEditing(true)}>Edit Item</EditButton>
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
