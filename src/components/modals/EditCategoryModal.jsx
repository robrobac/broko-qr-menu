import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { HeaderClose, HeaderTitle, Modal, ModalBody, ModalContent, ModalHeader } from '../styledComponents/StyledModal';
import { db } from '../../firebase/config';
import { EditButton, SubmitButton } from '../styledComponents/StyledButtons';
import { Divider, Form, FormInput, FormLabel, FormSection } from '../styledComponents/StyledForm';
import { ReactComponent as EditIcon } from "../../icons/editicon.svg";
import { ReactComponent as XIcon } from "../../icons/xicon.svg";

function EditCategoryModal({category}) {
    const [categoryValue, setCategoryValue] = useState(category.category);
    const [isEditing, setIsEditing] = useState(false)
    

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
            console.error(error);
        }
        
        //  Update lastedited timestamp to handle fetching from firestore or local storage.
        await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
        
        //  and close the form
        setIsEditing(false)
    }
    
    return (
        <div>
            <EditButton onClick={() => setIsEditing(true)}>
                <EditIcon height="100%"/>
            </EditButton>

            <Modal $showModal={isEditing ? 1 : 0} onClick={() => setIsEditing(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <HeaderTitle>Edit Category</HeaderTitle>
                    <HeaderClose onClick={() => setIsEditing(false)}>
                        <XIcon height="100%"/>
                    </HeaderClose>
                </ModalHeader>
                <ModalBody>
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
                </ModalBody>
            </ModalContent>
            </Modal>
        </div>
    )
}

export default EditCategoryModal
