import React, { useState } from 'react'
import NewItemModalForm from './NewItemModalForm';
import { AddProductButton } from '../../styledComponents/StyledButtons';
import { HeaderClose, HeaderTitle, Modal, ModalBody, ModalContent, ModalHeader } from '../../styledComponents/StyledModal';
import { ReactComponent as XIcon } from "../../../icons/xicon.svg";
import { UploadLoader } from '../../styledComponents/StyledLoader';
import { useTranslation } from 'react-i18next';

function NewItemModal({isDrink}) {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showDrinkModal, setShowDrinkModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false)

    const { t } = useTranslation()

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
            {isUploading ? <UploadLoader><span className="uploadLoader"></span></UploadLoader> : ""}
            {isDrink ? (
                <AddProductButton onClick={() => setShowDrinkModal(true)}>{t("Add New Drink")}</AddProductButton>
            ) : (
                <AddProductButton onClick={() => setShowFoodModal(true)}>{t("Add New Food")}</AddProductButton>
            )}
            {showFoodModal ? (
                <Modal $showModal={showFoodModal ? 1 : 0} onClick={() => outsideClick("food")}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <HeaderTitle>{t("Add New Food")}</HeaderTitle>
                            <HeaderClose onClick={() => setShowFoodModal(false)}>
                                <XIcon height="100%"/>
                            </HeaderClose>
                        </ModalHeader>
                        <ModalBody>
                            <NewItemModalForm isDrink={false} setIsUploading={setIsUploading}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            ) : ""}
            {showDrinkModal ? (
                <Modal $showModal={showDrinkModal ? 1 : 0} onClick={() => outsideClick("drink")}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <HeaderTitle>{t("Add New Drink")}</HeaderTitle>
                            <HeaderClose onClick={() => setShowDrinkModal(false)}>
                                <XIcon height="100%"/>
                            </HeaderClose>
                        </ModalHeader>
                        <ModalBody>
                            <NewItemModalForm isDrink={true} setIsUploading={setIsUploading}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            ) : ""}
        </div>
    )
}

export default NewItemModal
