import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import NewItemModalForm from '../components/NewItemModalForm';
import { Tab, Tabs } from 'react-bootstrap';
import AdminDrink from './AdminDrink';
import AdminFood from './AdminFood';

function Admin() {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showDrinkModal, setShowDrinkModal] = useState(false);

    //  Opening and closing new food modal
    const handleCloseFood = () => setShowFoodModal(false);
    const handleShowFood = () => setShowFoodModal(true);

    //  Opening and closing new drink modal
    const handleCloseDrink = () => setShowDrinkModal(false);
    const handleShowDrink = () => setShowDrinkModal(true);

    const [childActiveCategory, setChildActiveCategory] = useState(true)

    //  On tab change scroll to top and reset the active category navigation
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        
        setTimeout(() => {
            setChildActiveCategory(!childActiveCategory)
        }, 100);
    };

    return (
        <div>
            <main>
                <Tabs
                onSelect={scrollToTop}
                defaultActiveKey="food"
                id="justify-tab-example"
                className="sticky-top tabs mt-2 pb-0"
                justify
                >
                    <Tab eventKey="drink" title="Drink" >
                        {/* <CategoryNav category="drink" refreshNav={childActiveCategory}/> */}
                        <AdminDrink />
                        <Button variant="primary" onClick={handleShowDrink}>Add Drink Item</Button>
                    </Tab>
                    <Tab eventKey="food" title="Food" >
                        {/* <CategoryNav category="food" refreshNav={childActiveCategory}/> */}
                        <AdminFood />
                        <Button variant="primary" onClick={handleShowFood}>Add Food Item</Button>
                    </Tab>
                </Tabs>
            </main>


            
            
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
