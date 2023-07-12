import React from 'react'
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import noimage from "../noimage.png"

function ItemCard({item}) {


    return (
        <Card style={{ maxWidth: '400px', margin: "auto"}}>
            <Card.Img variant="top" src={item?.fileUrl} key={item?.id} onError={(e) => { e.target.src = noimage}}/>
            <Card.ImgOverlay className='flex'>
                <Badge bg="secondary">New</Badge>
            </Card.ImgOverlay>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ItemCard
