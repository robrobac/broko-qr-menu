import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import NewItemModalForm from './NewItemModalForm';

function NewItemModal({isDrink}) {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showDrinkModal, setShowDrinkModal] = useState(false);

    return (
        <div className='sticky-bottom'>
            {isDrink ? (
                <Button variant="primary" onClick={() => setShowDrinkModal(true)}>Add Drink Item</Button>
            ) : (
                <Button variant="primary" onClick={() => setShowFoodModal(true)}>Add Food Item</Button>
            )}
            {showFoodModal ? (
                    <Modal show={showFoodModal} onHide={() => setShowFoodModal(false)} animation={false}>
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
