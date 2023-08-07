import React, { useState } from 'react'
import NewItemModalForm from './NewItemModalForm';
import { AddProductButton } from '../../styledComponents/StyledButtons';
import { HeaderClose, HeaderTitle, Modal, ModalBody, ModalContent, ModalHeader } from '../../styledComponents/StyledModal';
import { ReactComponent as XIcon } from "../../../icons/xicon.svg";

function NewItemModal({isDrink}) {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showDrinkModal, setShowDrinkModal] = useState(false);

    //  Close modal once clicked or tapped outside the modal.
    const outsideClick = (e) => {
        if (e === "food") {
            setShowFoodModal(false)
            return
        } else if (e === "food") {
            setShowDrinkModal(false)
            return
        } else {
            setShowFoodModal(false)
            setShowDrinkModal(false)
        }
    }

    return (
        <div className='newItemModal'>
            {isDrink ? (
                <AddProductButton onClick={() => setShowDrinkModal(true)}>Add New Drink</AddProductButton>
            ) : (
                <AddProductButton onClick={() => setShowFoodModal(true)}>Add New Food</AddProductButton>
            )}
            {showFoodModal ? (
                <Modal $showModal={showFoodModal ? 1 : 0} onClick={() => outsideClick("food")}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <HeaderTitle>Add New Food</HeaderTitle>
                            <HeaderClose onClick={() => setShowFoodModal(false)}>
                                <XIcon height="100%"/>
                            </HeaderClose>
                        </ModalHeader>
                        <ModalBody>
                            <NewItemModalForm isDrink={false}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            ) : ""}
            {showDrinkModal ? (
                <Modal $showModal={showDrinkModal ? 1 : 0} onClick={() => outsideClick("drink")}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <HeaderTitle>Add New Drink</HeaderTitle>
                            <HeaderClose onClick={() => setShowDrinkModal(false)}>
                                <XIcon height="100%"/>
                            </HeaderClose>
                        </ModalHeader>
                        <ModalBody>
                            <NewItemModalForm isDrink={true}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            ) : ""}
        </div>
    )
}

export default NewItemModal
