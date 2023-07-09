import React from 'react'
import Card from 'react-bootstrap/Card';

function CategoryCard({item}) {
    return (
        <Card style={{ maxWidth: '300px', margin: "auto"}}>
            <Card.Img variant="top" src={item?.fileUrl} key={item?.id}/>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CategoryCard
