import React, { useState } from 'react'
import NewItemForm from '../components/NewItemForm'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

function Admin() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Add Item</Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewItemForm handleClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Admin
