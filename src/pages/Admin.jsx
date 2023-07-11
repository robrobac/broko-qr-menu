import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import NewItemModalForm from '../components/NewItemModalForm';

function Admin() {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showDrinkModal, setShowDrinkModal] = useState(false);

    //  Opening and closing new food modal
    const handleCloseFood = () => setShowFoodModal(false);
    const handleShowFood = () => setShowFoodModal(true);

    //  Opening and closing new drink modal
    const handleCloseDrink = () => setShowDrinkModal(false);
    const handleShowDrink = () => setShowDrinkModal(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShowFood}>Add Food Item</Button>
            <Button variant="primary" onClick={handleShowDrink}>Add Drink Item</Button>
            {showFoodModal ? (
                <Modal show={showFoodModal} onHide={handleCloseFood} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewItemModalForm handleClose={handleCloseFood} isDrink={false} />
                </Modal.Body>
            </Modal>
            ) : (
                <Modal show={showDrinkModal} onHide={handleCloseDrink} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Drink</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <NewItemModalForm handleClose={handleCloseFood} isDrink={true} />
                    </Modal.Body>
                </Modal>
            )}
        </div>
    )

}

export default Admin
