import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { db } from '../firebase/config';
import { EditButton, SubmitButton } from './StyledButtons';
import { Divider, Form, FormInput, FormLabel, FormSection } from './StyledForm';

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
        
        //  Update lastedited timestamp to handle fetching from firestore or local storage.
        await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
        
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
                    <Form onSubmit={handleCategoryChange}>
                        <FormSection>
                            <FormLabel htmlFor="inputCategory">Title</FormLabel>
                            <FormInput
                            autoFocus
                            required
                            id='inputCategory'
                            value={categoryValue}
                            onChange={(e) => setCategoryValue(e.target.value)}
                            />
                        </FormSection>
                        <Divider></Divider>
                        <SubmitButton type="submit">
                            Save Changes
                        </SubmitButton>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditCategoryModal
