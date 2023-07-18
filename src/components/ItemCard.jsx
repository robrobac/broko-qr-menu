import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import noimage from "../noimage.png"
import { AuthContext } from '../App'
import EditItemModal from '../pages/admin/components/editItemModal/EditItemModal';
import "./ItemCard.scss"
import { DeleteButton } from './StyledButtons';

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
        <Card>
            <Card.Img variant="top" src={item?.fileUrl} key={item?.id} onError={(e) => { e.target.src = noimage}}/>
            <Card.Body className='cardBody'>
                <div className="cardContentHeader">
                    <Card.Title className='cardTitle'>{item.title}</Card.Title>
                    <p className='eur'>{item.priceEUR}€ <span>({item.priceKN}kn)</span></p>
                </div>
                <Card.Text className='description'>{item.description}</Card.Text>
                
                
                {isAuth ? (
                    <div className='itemControls'>
                        <div className="buttons">
                            <DeleteButton onClick={() => handleDelete(item)}>Delete Item</DeleteButton>
                            <EditItemModal item={item}/>
                        </div>
                        <div className="createdEdited">
                            <p>Created: {formattedDateCreated}</p>
                            <p>Edited: {formattedDateEdited}</p>
                        </div>
                    </div>
                ) : ""}
                
            </Card.Body>
        </Card>
    )
}

export default ItemCard
