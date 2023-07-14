import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import noimage from "../noimage.png"
import { AuthContext } from '../App'
import { Modal } from 'react-bootstrap';
import EditItemForm from '../pages/admin/components/EditItemForm';

function ItemCard({item, handleDelete, handleEdit, isEditing, setIsEditing}) {
    const {isAuth} = useContext(AuthContext)

    //  handles passing argument needed to handle edit, arguments are passed from EditItemForm
    const handlePassEditedItem = (itemObject, itemPath) => {
        //  Passing edited item object to Items component to handle edit
        handleEdit(itemObject, itemPath)
    }

    const dateCreatedTimestamp = item.dateCreated
    const dateCreated = new Date(dateCreatedTimestamp)

    const dateEditedTimestamp = item.dateEdited
    const dateEdited = new Date(dateEditedTimestamp)

    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };

    const formattedDateCreated = dateCreated.toLocaleString('en-US', dateOptions)
    const formattedDateEdited = dateEdited.toLocaleString('en-US', dateOptions)

    return (
        <Card style={{ maxWidth: '400px', margin: "auto"}}>
            <Card.Img variant="top" src={item?.fileUrl} key={item?.id} onError={(e) => { e.target.src = noimage}}/>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <p>{item.priceEUR}</p>
                <p>{item.priceKN}</p>
                <p>Created: {formattedDateCreated}</p>
                <p>Edited: {formattedDateEdited}</p>
                <Card.Text>{item.description}</Card.Text>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item)} hidden={!isAuth}>
                    Delete
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                    EDIT
                </button>
            </Card.Body>
            <Modal show={isEditing} onHide={() => setIsEditing(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Drink</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditItemForm item={item} handlePassEditedItem={handlePassEditedItem}/>
                </Modal.Body>
            </Modal>
        </Card>
    )
}

export default ItemCard
