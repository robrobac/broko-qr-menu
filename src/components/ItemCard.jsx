import React from 'react'
import Card from 'react-bootstrap/Card';
import noimage from "../noimage.png"
import DeleteItemButton from '../pages/admin/components/DeleteItemButton';
import EditItemButton from '../pages/admin/components/EditItemButton';

function ItemCard({item}) {


    return (
        <Card style={{ maxWidth: '400px', margin: "auto"}}>
            <Card.Img variant="top" src={item?.fileUrl} key={item?.id} onError={(e) => { e.target.src = noimage}}/>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <DeleteItemButton item={item}/>
                <EditItemButton item={item}/>
            </Card.Body>
        </Card>
    )
}

export default ItemCard
