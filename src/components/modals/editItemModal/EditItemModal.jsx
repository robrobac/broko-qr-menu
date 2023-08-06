import React, { useState } from 'react'
import EditItemModalForm from './EditItemModalForm'
import { EditButton } from '../../styledComponents/StyledButtons';
import { HeaderClose, HeaderTitle, Modal, ModalBody, ModalContent, ModalHeader } from '../../styledComponents/StyledModal';
import { ReactComponent as EditIcon } from "../../../icons/editicon.svg";
import { ReactComponent as XIcon } from "../../../icons/xicon.svg";


function EditItemModal({item}) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
        <EditButton onClick={() => setIsEditing(true)}>
            <EditIcon height="100%"/>
        </EditButton>

            <Modal $showModal={isEditing ? 1 : 0} onClick={() => setIsEditing(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <HeaderTitle>Edit {item.mainCategory}</HeaderTitle>
                    <HeaderClose onClick={() => setIsEditing(false)}>
                        <XIcon height="100%"/>
                    </HeaderClose>
                </ModalHeader>
                <ModalBody>
                    <EditItemModalForm item={item} setIsEditing={setIsEditing}/>
                </ModalBody>
            </ModalContent>
        </Modal>

        
        </>
    )
}

export default EditItemModal