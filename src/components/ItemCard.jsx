import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import noimage from "../noimage.png"
import { AuthContext } from '../App'
import EditItemModal from '../pages/admin/components/editItemModal/EditItemModal';

function ItemCard({item, handleDelete}) {
    const {isAuth} = useContext(AuthContext)

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
                <EditItemModal item={item}/>
            </Card.Body>
        </Card>
    )
}

export default ItemCard
