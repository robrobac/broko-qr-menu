import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import NewDrinkModalForm from '../components/NewDrinkModalForm';
import NewFoodModalForm from '../components/NewFoodModalForm';

function Admin() {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showDrinkModal, setShowDrinkModal] = useState(false);

    const handleCloseFood = () => setShowFoodModal(false);
    const handleShowFood = () => setShowFoodModal(true);

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
                    <NewFoodModalForm handleClose={handleCloseFood}/>
                </Modal.Body>
            </Modal>
            ) : (
                <Modal show={showDrinkModal} onHide={handleCloseDrink} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Drink</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewDrinkModalForm handleClose={handleCloseDrink}/>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    )

}

export default Admin
