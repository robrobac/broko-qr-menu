import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { db } from '../../../firebase/config';
import { EditButton } from '../../../components/StyledButtons';

function EditCategoryModal({category}) {
    const [isEditing, setIsEditing] = useState(false)
    const [categoryValue, setCategoryValue] = useState(category.category);

    const handleCategoryChange = async (e) => {
        e.preventDefault()
        //  Create category object with only properties that are changing
        const categoryObject = {
            category: categoryValue,
            dateEdited: Date.now(),
        }
        try {
            //  Get category document ref
            const docRef = doc(db, category.categoryPath)
            //  Update the item
            await updateDoc(docRef, categoryObject)
        } catch (error) {
            console.error("error creating a new item", error);
        }
        //  and close the form
        setIsEditing(false)
    }
    
    return (
        <div>
            <EditButton onClick={() => setIsEditing(true)}>Edit Category</EditButton>
            <Modal show={isEditing} onHide={() => setIsEditing(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="editCategoryForm" onSubmit={handleCategoryChange}>
                        <Form.Group className="mb-3" id="categoryForm">
                            <Form.Label htmlFor="inputCategory">Title</Form.Label>
                            <Form.Control
                            autoFocus
                            required
                            id='inputCategory'
                            value={categoryValue}
                            onChange={(e) => setCategoryValue(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditCategoryModal
