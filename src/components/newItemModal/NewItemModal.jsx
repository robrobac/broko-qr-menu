import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import NewItemModalForm from './NewItemModalForm';
import "./NewItemModal.scss"
import { AddProductButton } from '../StyledButtons';

function NewItemModal({isDrink}) {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showDrinkModal, setShowDrinkModal] = useState(false);

    return (
        <div className='newItemModal'>
            {isDrink ? (
                <AddProductButton onClick={() => setShowDrinkModal(true)}>Add New Drink</AddProductButton>
            ) : (
                <AddProductButton onClick={() => setShowFoodModal(true)}>Add New Food</AddProductButton>
            )}
            {showFoodModal ? (
                    <Modal show={showFoodModal} onHide={() => setShowFoodModal(false)} animation={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Food</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewItemModalForm isDrink={false} />
                        </Modal.Body>
                    </Modal>
                ) : (
                    <Modal show={showDrinkModal} onHide={() => setShowDrinkModal(false)} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Drink</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <NewItemModalForm isDrink={true} />
                        </Modal.Body>
                    </Modal>
                )}
        </div>
    )
}

export default NewItemModal
